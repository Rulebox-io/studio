/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const moment = require('moment')
const faunadb = require('faunadb')
const q = faunadb.query

module.exports = class Store {

    // Constructor
    // ===========
    /**
     * Constructs a new Store instance.
     * @param {string} secret The Fauna secret key to use. 
     */
    constructor(secret) {
        this.secret = secret;
    }



    // Public functions
    // ================
    /**
     * Creates a new API key. This function creates a new 'api key' document.
     * @param {string} tenant The tenant.
     * @param {string} name The name of the key.
     * @param {string} tag The key's tag.
     * @param {string} primary The primary API key value.
     * @param {string} seconday The secondary API key value.
     */
    async createApiKey(tenant, name, tag, primary, secondary) {

        const client = this._getClient()

        try {

            // Don't create a key if one already exists.
            const exists = await client.query(q.Exists(q.Match(q.Index("api-key-by-tag"), q.Casefold(tenant), tag)))
            if (exists === true) return null;

            const result = await client.query(
                q.Create(
                    q.Collection('api-keys'),
                    {
                        data: {
                            tenant: q.Casefold(tenant),
                            name,
                            tag,
                            primary,
                            secondary,
                            "issued_on": moment().format("YYYY-MM-DD")
                        }
                    }))

            console.log(result)

            return {
                status: "success",
                tenant: result.data.tenant,
                name: result.data.name,
                tag: result.data.tag,
                primary: result.data.primary,
                secondary: result.data.secondary,
                issued_on: result.data.issued_on
            }
        }
        catch (err) {
            return { status: "error", err }
        }
    }

    /**
     * Signs up a user. This function creates a user record, or updates an existing user record
     * to add a tenant or set the user's identifier upon first logon.
     * @param {String} email The email address of the user.
     * @param {String} tenant Optionally, the tenant to assign the user to.
     * @returns The user.
     */
    async signupUser(email, tenant) {
        const client = this._getClient()

        try {

            // Does the user already exist?
            const exists = await client.query(q.Exists(q.Match(q.Index("user-by-email"), q.Casefold(email))))
            if (exists === false) {

                // The user did not exist, so we create a user record with a 'tenants' list.
                const tenants = {}
                if (tenant) tenants[this._normaliseTenantName(tenant)] = "contributor"

                const result = await client.query(
                    q.Create(
                        q.Collection('users'),
                        {
                            data: {
                                email,
                                tenants,
                            }
                        }))

                return {
                    status: "success",
                    ref: result.ref,
                    data: {
                        email: result.data.email,
                        id: result.data.id,
                        tenants: result.data.tenants
                    }
                }
            } else {
                // This is an existing user. We update its tenant membership
                const existing = await this.getUserByEmail(email)

                const tenants = existing.data.tenants || {}
                if (tenant) tenants[this._normaliseTenantName(tenant)] = "contributor"
                await client.query(q.Update(existing.ref, { data: { tenants } }))

                return {
                    status: "success",
                    ref: existing.ref,
                    data: {
                        email: existing.data.email,
                        id: existing.data.id,
                        tenants
                    }
                }
            }
        }
        catch (err) {
            return { status: "error", err }
        }
    }

    /**
     * Creates a new tenant.
     * @param {String} name The name of the tenant.
     * @returns The tenant.
     */
    async createTenant(name) {
        const client = this._getClient()

        const tag = this._normaliseTenantName(name)

        // Don't create a key if one already exists.
        const exists = await client.query(q.Exists(q.Match(q.Index("tenant-by-tag"), tag)))
        if (exists === true) return null;

        const result = await client.query(
            q.Create(
                q.Collection('tenants'),
                {
                    data: {
                        tag,
                        name,
                    }
                }))

        return {
            status: "success",
            name: result.data.name,
            tag: result.data.tag,
        }
    }

    /**
     * Deletes a key given a tag.
     * @param {string} tenant The tenant.
     * @param {*} name The key's tag.
     */
    async deleteApiKey(tenant, tag) {

        const client = this._getClient()

        try {

            // Check if a matching key exists.
            const existing = await client.query(q.Get(q.Match(q.Index("api-key-by-tag"), q.Casefold(tenant), tag)))
            if (undefined == existing) return null;

            await client.query(
                q.Delete(existing.ref)
            )

            return { status: "success", tag: existing.data.tag }
        }
        catch (err) {
            return null // q.Get() thrown an error when a document can't be found.
        }

    }

    /**
     * Retrieves API keys for a given tenant. This function returns an array
     * of API keys.
     * @param {string} tenant The tenant.
     */
    async getApiKeys(tenant) {
        const client = this._getClient()

        const helper = client.paginate(q.Match(q.Index("api-keys-summary"), q.Casefold(tenant)))

        const results = []

        await helper
            .map((tenant, name, primary, secondary, issued_on) => ({
                tenant: q.Var("tenant"),
                name: q.Var("name"),
                primary: q.Var("primary"),
                secondary: q.Var("secondary"),
                issued_on: q.Var("issued_on"),
            }))
            .each(function (page) {
                page.forEach(result => results.push(result))
            })
            .catch((e) => {
                console.log(e)
            })

        return results;
    }

    async getEntities(tenant) {
        const client = this._getClient()

        const result = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index("entities-by-tenant"), q.Casefold(tenant))),
                q.Lambda(
                    "entityRef",
                    q.Let(
                        {
                            entityDoc: q.Get(q.Var("entityRef"))
                        },
                        q.Let(
                            {
                                headDoc: q.Get(q.Select(["data", "head"], q.Var("entityDoc")))
                            },
                            {
                                ref: q.Select("ref", q.Var("entityDoc")),
                                name: q.Select(["data", "name"], q.Var("entityDoc")),
                                tag: q.Select(["data", "tag"], q.Var("entityDoc")),
                                labels: q.Select(["data", "labels"], q.Var("entityDoc")),
                                revision: {
                                    ref: q.Select("ref", q.Var("headDoc")),
                                    revision: q.Select(["data", "revision"], q.Var("headDoc")),
                                    status: q.Select(["data", "status"], q.Var("headDoc")),
                                    edited_by: q.Select(["data", "edited_by"], q.Var("headDoc")),
                                    published_by: q.Select(["data", "published_by"], q.Var("headDoc")),
                                    last_modified_on: q.Select("ts", q.Var("headDoc"))
                                }
                            }
                        )
                    )
                )
            )
        )

        if (!result || !result.data || !Array.isArray(result.data)) return null

        return result.data.map(e => ({
            id: e.ref.id,
            name: e.name,
            tag: e.tag,
            labels: e.labels,
            revision: {
                id: e.revision.ref.id,
                revision: e.revision.revision,
                status: e.revision.status,
                edited_by: e.revision.edited_by,
                published_by: e.revision.published_by,
                last_modified_on: moment(e.revision.last_modified_on / 1000).format("YYYY-MM-DD")
            },
        }))
    }

    /**
     * Retrieves an entity given an entity identifier.
     * @param {string} id The entity identifier.
     * @returns The entity.
     */
    async getEntity(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    revisionRef: q.Ref(q.Collection("entity-revisions"), id)
                },
                q.If(
                    q.Exists(q.Var("revisionRef")),
                    q.Let(
                        { revisionDoc: q.Get(q.Var("revisionRef")) },
                        q.Let(
                            {
                                entityDoc: q.Get(q.Select(["data", "entity"], q.Var("revisionDoc")))
                            },
                            {
                                status: "success",
                                data: {
                                    id: q.Select(["ref", "id"], q.Var("entityDoc")),
                                    name: q.Select(["data", "name"], q.Var("entityDoc")),
                                    tag: q.Select(["data", "tag"], q.Var("entityDoc")),
                                    labels: q.Select(["data", "labels"], q.Var("entityDoc")),
                                    revision: {
                                        id: q.Select(["ref", "id"], q.Var("revisionDoc")),
                                        revision: q.Select(["data", "revision"], q.Var("revisionDoc")),
                                        status: q.Select(["data", "status"], q.Var("revisionDoc")),
                                        edited_by: q.Select(["data", "edited_by"], q.Var("revisionDoc")),
                                        published_by: q.Select(["data", "published_by"], q.Var("revisionDoc")),
                                        definition: q.Select(["data", "definition"], q.Var("revisionDoc"))
                                    }
                                }
                            }
                        )
                    ),
                    {
                        status: "not-found"
                    }
                )
            )
        )

        if (result.status == 'success') return result.data;
        return null;
    }

    /**
     * Retrieves a user. This function retrieves a user with a matching identifier.
     * @param {string} id The user's identifier.
     * @returns The user.
     */
    async getUser(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    ref: q.Match(q.Index("user-by-id"), id),
                },
                q.If(
                    q.Exists(q.Var('ref')),
                    {
                        status: 'success',
                        data: q.Get(q.Var('ref'))
                    },
                    {
                        status: 'not-found',
                        code: 404
                    }
                )
            ))

        if (result.status == 'success') return result.data;
        return null;
    }

    /**
     * Retrieves a user given an email address. This function retrieves a user with a matching email address.
     * @param {string} email The user's Email address.
     * @returns The user.
     */
    async getUserByEmail(email) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    ref: q.Match(q.Index("user-by-email"), q.Casefold(email)),
                },
                q.If(
                    q.Exists(q.Var('ref')),
                    {
                        status: 'success',
                        data: q.Get(q.Var('ref'))
                    },
                    {
                        status: 'not-found',
                        code: 404
                    }
                )
            ))

        if (result.status == 'success') return result.data;
        return null;
    }

    /**
     * Updates a user's login timestamp. This function updates the user record with the
     * specified timestamp.
     * @param {string} ref The user's document reference.
     * @param {string} issuer The issuer of the token - we will use that to update the user's identifier.
     * @param {int} timestamp The new timestamp.
     */
    async updateUserLogin(ref, issuer, timestamp) {
        const client = this._getClient()
        await client.query(q.Update(ref, { data: { id: issuer, lastLoginAt: timestamp } }))
    }



    // Private implementation
    // ======================
    /**
     * Instantiates and returns a FaunaDB client.
     * @returns The FaunaDB client.
     */
    _getClient() {
        return new faunadb.Client({
            secret: this.secret,
            domain: "db.eu.fauna.com"
        })
    }

    /**
     * Normalises a tenant name. This function converts a string to a normalised name string,
     * removing non-alphanumeric characters, and converting spaces to dashes.
     * @param {string} name The name string. 
     * @returns The normalised name string.
     */
    _normaliseTenantName(name) {
        if (undefined == name) return;
        return name.replace(/[ _]/g, '-').replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
    }

}