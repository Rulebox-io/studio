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
    * Retrieves a RuleSet given a Tenant and Tag, including the latest revision
    * @param {string} tenant The tenant name.
    * @param {string} tag The tag name.
    * @returns The RuleSet.
    */
    async getRuleSetByTag(tenant, tag) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-ruleset-by-tag", 
                tenant,
                tag)
            )

        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Gets all rulesets for a tenant.
    * @param {String} name The name of the tenant.
    * @returns The tenant.
    */
    async getRuleSets(tenant) {
        const client = this._getClient()
    
        const result = await client.query(
            q.Call("get-rulesets", 
                tenant)
            )
               
        return {
            body: result.data
        }
    }

    /**
    * Retrieves a RuleSet given an ID, including latest revision
    * @param {string} id The ruleset id.
    * @returns The RuleSet.
    */
    async getRulesetById(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-ruleset-by-ref", 
                id)
            )
                
        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Retrieves a RuleSet given a tenant, tag and revision number and returnes the Ruleset and specified revision.
    * @param {string} tenant The tenant name.
    * @param {string} tag The tag name.
    * @param {string} revision The revision number.
    * @returns The RuleSet.
    */
    async getRuleSetByTagAndRevision(tenant, tag, revision) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-ruleset-by-tag-and-revision", 
                tenant, tag, revision)
            )

        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Retrieves a RuleSet and Revision given a RuleSet revision identifier.
    * @param {string} id The RuleSet revision identifier.
    * @returns The RuleSet.
    */
    async getRuleSetByRevisionRef(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-ruleset-by-revisionref", 
                id)
            )
            
        return {
            code: result.code,
            body: result.body
        }
    } 

    /**
    * Creates a new ruleset and ruleset revision.
    * @param {rulset} name The ruleset object.
    * @returns The ruleset ids.
    */
    async createRuleSet(ruleSet) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("create-ruleset", 
                ruleSet.user,
                ruleSet.tenant,
                ruleSet.name,
                ruleSet.tag,
                ruleSet.description,
                ruleSet.definition,
                ruleSet.entityRevisionId)
            )
            // .catch((err) => 
            //     console.error(
            //     'Error: [%s] %s: %s %s %s',
            //     err.name,
            //     err.message,
            //     err.errors()[0].description,
            //     err.errors()[0].cause[0].code,
            //     err.errors()[0].cause[0].description,
            //     ),             
            // )
              
        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Updates a ruleset.
    * @param {string} id The ruleset id.
    * @param {ruleset} ruleset The ruleset object.
    * @returns The ruleset ids.
    */
    async updateRuleset(id, ruleset) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("update-ruleset", 
                id,
                ruleset.timeStamp,
                ruleset.name,
                ruleset.tag,
                ruleset.description
                )
            )
        
        return {
            code: result.code,
            body: result.body
        }
    }


    /**
    * Updates the ruleset revision or creates a new one if the the existing revision is published.
    * @param {String} id The id of the ruleset revision.
    * @param {String} ruleset The ruleset revision object.
    * @returns The ruleset.
    */
    async updateRuleSetRevision(id, ruleSet) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("update-ruleset-revision", 
                id,
                ruleSet.entityRevisionId,
                ruleSet.timeStamp,
                ruleSet.userId,
                ruleSet.definition,
                ruleSet.status
                )
            )
        
        return {
            code: result.code,
            body: result.body
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