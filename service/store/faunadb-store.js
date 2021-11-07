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

    /**
     * Retrieves a user. This function retrieves a user with a matching identifier.
     * @param {string} id The user's identifier.
     * @returns The user.
     */
    async getUser(id) {
        const client = this._getClient()
        return await client.query(q.Get(q.Match(q.Index("user-by-id"), id)))
    }

    /**
     * Updates a user's login timestamp. This function updates the user record with the
     * specified timestamp.
     * @param {string} ref The user's document reference.
     * @param {int} timestamp The new timestamp.
     */
    async updateUserLogin(ref, timestamp) {
        const client = this._getClient()
        await client.query(q.Update(ref, { data: { lastLoginAt: timestamp } }))
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
}