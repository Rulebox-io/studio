/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const moment = require('moment')
const faunadb = require('faunadb')
const q = faunadb.query

module.exports = class RuleStore {

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
     * Retrieves a RuleSet given a RuleSet identifier.
     * @param {string} id The RuleSet identifier.
     * @returns The RuleSet.
     */
     async getRuleSet(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Let(
                {
                    ruleSetRef: q.Ref(q.Collection("rulesets"), id)
                },
                q.If(
                    q.Exists(q.Var('ruleSetRef')),
                    {
                        status: 'success',
                        data: q.Get(q.Var('ruleSetRef'))
                    },
                    {
                        status: 'not-found',
                        code: 404
                    }
                )              
            )
        )

        if (result.status != 'success') return
        return {
            ...result.data
        }
    }

        /**
     * Creates a new tenant.
     * @param {String} name The name of the tenant.
     * @returns The tenant.
     */
    async createRuleSet(ruleSet) {
        const client = this._getClient()

        // Don't create a key if one already exists.
        // const exists = await client.query(q.Exists(q.Match(q.Index("tenant-by-tag"), tag)))
        // if (exists === true) return null;

        console.debug(ruleSet)

        const result = await client.query(
            // q.Create(
            //     q.Collection('rulesets'),
            //     {
            //         data: {
            //             ruleSet,
            //         }
            //     })
            q.Call("create-ruleset", 
                "user",
                "teppa",
                "test name",
                "tag",
                "test desc",
                "339545286012567757")
            )
            .then((ret) => console.log(ret))
            .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
            )
        )
        
            

        return {
            status: "success"//,
            // name: result.data.name,
            // tag: result.data.tag,
        }
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