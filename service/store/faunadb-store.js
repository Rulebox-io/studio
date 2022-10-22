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
     * This function deletes an entity revision. If the revision does not exist,
     * or a newer revision exists, or the revision is not a draft, this function returns
     * an error. The entity's head revision will be the latest revision, post deletion.
     * If the entity does not have a head revision, the entire entity will be deleted. 
     * @param {string} id The ID of the revision to delete. 
     * @returns The result of the operation.
     */
    async deleteEntityRevision(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    revisionRef: q.Ref(q.Collection("entity-revisions"), id)
                },
                q.If(
                    q.Exists(q.Var("revisionRef")),
                    q.Let(
                        {
                            revisionDoc: q.Get(q.Var("revisionRef")),
                            entityDoc: q.Get(q.Select(["data", "entity"], q.Var("revisionDoc"))),
                            headRef: q.Select(["data", "head"], q.Var("entityDoc")),
                        },
                        q.If(
                            q.Equals(q.Var("revisionRef"), q.Select(["data", "latest"], q.Var("entityDoc"))),
                            q.If(
                                q.Equals("draft", q.Select(["data", "status"], q.Var("revisionDoc"))),
                                q.If(
                                    q.Exists(q.Var("headRef")),
                                    q.Let(
                                        {
                                            headDoc: q.Get(q.Var("headRef")),
                                            deleted: q.Delete(q.Var("revisionRef")),
                                            updated: q.Update(q.Select(["ref"], q.Var("entityDoc")), { data: { latest: q.Var("headRef") } })
                                        },
                                        {
                                            "status": "success",
                                            "data": {
                                                "id": q.Select(["ref", "id"], q.Var("headDoc")),
                                                "tag": q.Select(["data", "tag"], q.Var("entityDoc")),
                                                "revision": q.Select(["data", "revision"], q.Var("headDoc")),
                                                "last_modified_on": q.Select("ts", q.Var("headDoc"))
                                            }
                                        }
                                    ),
                                    q.Let(
                                        {
                                            deletedEntity: q.Delete(q.Select("ref", q.Var("entityDoc"))),
                                            deletedRevision: q.Delete(q.Var("revisionRef"))
                                        },
                                        {
                                            "status": "success",
                                        }
                                    )
                                ),
                                {
                                    "status": "precondition-failed",
                                    "sub_status": "in-use",
                                    "message": "entity revision is in use"
                                }
                            ),
                            {
                                "status": "precondition-failed",
                                "sub_status": "newer-available",
                                "message": "newer revision available"
                            }
                        )
                    ),
                    {
                        status: "not-found"
                    }
                )
            )
        )
        return result
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
                                headDoc: q.Get(q.Select(["data", "head"], q.Var("entityDoc"))),
                                latestDoc: q.Get(q.Select(["data", "latest"], q.Var("entityDoc")))
                            },
                            {
                                id: q.Select(["ref", "id"], q.Var("entityDoc")),
                                name: q.Select(["data", "name"], q.Var("entityDoc")),
                                tag: q.Select(["data", "tag"], q.Var("entityDoc")),
                                labels: q.Select(["data", "labels"], q.Var("entityDoc")),
                                latest: {
                                    id: q.Select(["ref", "id"], q.Var("latestDoc")),
                                    revision: q.Select(["data", "revision"], q.Var("latestDoc")),
                                    status: q.Select(["data", "status"], q.Var("latestDoc")),
                                    edited_by: q.Select(["data", "edited_by"], q.Var("latestDoc")),
                                    published_by: q.Select(["data", "published_by"], q.Var("latestDoc")),
                                    last_modified_on: q.Select("ts", q.Var("latestDoc"))
                                },
                                head: {
                                    id: q.Select(["ref", "id"], q.Var("headDoc")),
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
            ...e,
            latest: { ...e.latest, last_modified_on: moment(e.latest.last_modified_on / 1000).format("YYYY-MM-DD") },
            head: { ...e.head, last_modified_on: moment(e.head.last_modified_on / 1000).format("YYYY-MM-DD") }
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
                                        definition: q.Select(["data", "definition"], q.Var("revisionDoc")),
                                        ts: q.Select("ts", q.Var("revisionDoc"))
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

        if (result.status != 'success') return
        return {
            ...result.data,
            revision: {
                ...result.data.revision,
                last_modified_on: moment(result.data.revision.ts / 1000).format("YYYY-MM-DD")
            }
        }
    }

    /**
     * Retrieves an entity given its tag and a revision number.
     * @param {string} tag The entity's tag.
     * @param {number} tevision The entity revision number.
     * @returns The entity.
     */
    async getEntityByTagAndRevision(tag, revision) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    entityRef: q.Match(q.Index("entity-by-tag"), tag)
                },
                q.If(
                    q.Exists(q.Var("entityRef")),
                    q.Let(
                        {
                            entityDoc: q.Get(q.Var("entityRef")),
                            revisionRef: q.Match(q.Index("entity-by-revision"), [q.Select("ref", q.Var("entityDoc")), revision])
                        },
                        q.If(
                            q.Exists(q.Var("revisionRef")),
                            q.Let(
                                {
                                    revisionDoc: q.Get(q.Var("revisionRef"))
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
                                            definition: q.Select(["data", "definition"], q.Var("revisionDoc")),
                                            ts: q.Select("ts", q.Var("revisionDoc"))
                                        }
                                    }
                                }
                            ),
                            {
                                status: "not-found"
                            }
                        )
                    ),
                    {
                        status: "not-found"
                    }
                )
            )
        )

        if (result.status != 'success') return
        return {
            ...result.data,
            revision: {
                ...result.data.revision,
                last_modified_on: moment(result.data.revision.ts / 1000).format("YYYY-MM-DD")
            }
        }
    }

    /**
     * Retrieves an entity's HEAD revision, given its tag.
     * @param {string} tag The entity's tag.
     * @returns The entity.
     */
    async getEntityByTag(tag) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    entityRef: q.Match(q.Index("entity-by-tag"), tag)
                },
                q.If(
                    q.Exists(q.Var("entityRef")),
                    q.Let(
                        {
                            entityDoc: q.Get(q.Var("entityRef")),
                            revisionDoc: q.Get(q.Select(["data", "head"], q.Var("entityDoc")))
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
                                    definition: q.Select(["data", "definition"], q.Var("revisionDoc")),
                                    ts: q.Select("ts", q.Var("revisionDoc"))
                                }
                            }
                        }
                    ),
                    {
                        status: "not-found"
                    }
                )
            )
        )

        if (result.status != 'success') return
        return {
            ...result.data,
            revision: {
                ...result.data.revision,
                last_modified_on: moment(result.data.revision.ts / 1000).format("YYYY-MM-DD")
            }
        }
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
     * Updates an entity revision. This function overwrites the definition of an entity
     * given the identifier of a revision. The provided timestamp acts as a check - an
     * entity revision cannot be updated if the latest timestamp is greater than the provided one.
     * If the revision is published, and no newer drafts exist, this function creates a new draft revision.
     * If the revision is a draft, this function updates the draft.
     * If a newer revision exists, this method returns an error.
     * @param {string} id The identifier of the revision. 
     * @param {string} timestamp The timestamp of the revision being edited, as far as the caller is aware.
     * @param {string} userId The identifier of the user making the change.
     * @param {any} definition The updated definition.
     */
    async updateEntityRevision(id, timestamp, userId, definition) {
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
                        q.If(
                            q.GTE(timestamp, q.Select(["ts"], q.Var("revisionDoc"))),
                            q.Let(
                                { entityDoc: q.Get(q.Select(["data", "entity"], q.Var("revisionDoc"))) },
                                q.If(
                                    q.Equals(q.Var("revisionRef"), q.Select(["data", "latest"], q.Var("entityDoc"))),
                                    q.If(
                                        q.Equals("published", q.Select(["data", "status"], q.Var("revisionDoc"))),
                                        q.Let(
                                            {
                                                newRevision: q.Add(1, q.Select(["data", "revision"], q.Var("revisionDoc"))),
                                                createdResult: q.Create(
                                                    q.Collection("entity-revisions"),
                                                    {
                                                        data: {
                                                            "entity": q.Select(["ref"], q.Var("entityDoc")),
                                                            "revision": q.Var("newRevision"),
                                                            "status": "draft",
                                                            "edited_by": userId,
                                                            "published_by": "",
                                                            definition
                                                        }
                                                    }
                                                ),
                                                updateResult: q.Update(q.Select(["ref"], q.Var("entityDoc")), { data: { latest: q.Select("ref", q.Var("createdResult")) } }),
                                            },
                                            {
                                                "status": "success",
                                                "data": {
                                                    "id": q.Select(["ref", "id"], q.Var("createdResult")),
                                                    "tag": q.Select(["data", "tag"], q.Var("entityDoc")),
                                                    "revision": q.Var("newRevision"),
                                                    "last_modified_on": q.Select("ts", q.Var("createdResult"))
                                                }
                                            }
                                        ),
                                        q.Let(
                                            {
                                                updateResult: q.Update(
                                                    q.Var("revisionRef"),
                                                    {
                                                        data: {
                                                            "edited_by": userId,
                                                            definition
                                                        }
                                                    }
                                                )
                                            },
                                            {
                                                "status": "success",
                                                "data": {
                                                    "id": q.Select(["ref", "id"], q.Var("updateResult")),
                                                    "tag": q.Select(["data", "tag"], q.Var("entityDoc")),
                                                    "revision": q.Select(["data", "revision"], q.Var("revisionDoc")),
                                                    "last_modified_on": q.Select("ts", q.Var("updateResult"))
                                                }
                                            }
                                        )
                                    ),
                                    {
                                        "status": "precondition-failed",
                                        "sub_status": "newer-available",
                                        "message": "newer revision available"
                                    }
                                )
                            ),
                            {
                                "status": "precondition-failed",
                                "sub_status": "stale",
                                "message": "The entity was already modified by someone else."
                            }
                        )
                    ),
                    {
                        status: "not-found"
                    }
                )
            )
        )

        return result
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