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
     * Gets all rulesets for a tennt.
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
     * Retrieves a RuleSet given a RuleSet identifier.
     * @param {string} id The RuleSet identifier.
     * @returns The RuleSet.
     */
     async getRuleSet(id) {
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
     * Retrieves a RuleSet given a RuleSet identifier.
     * @param {string} id The RuleSet identifier.
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
     * Retrieves a RuleSet given a RuleSet identifier.
     * @param {string} id The RuleSet identifier.
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
     * Creates a new tenant.
     * @param {String} name The name of the tenant.
     * @returns The tenant.
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
     * Creates a new tenant.
     * @param {String} name The name of the tenant.
     * @returns The tenant.
     */
          async updateRuleSet(id, ruleSet) {
            const client = this._getClient()
    
            const result = await client.query(
                q.Call("update-ruleset-revision", 
                    id,
                    ruleSet.entityRevisionId,
                    ruleSet.timeStamp,
                    ruleSet.userId,
                    ruleSet.definition
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