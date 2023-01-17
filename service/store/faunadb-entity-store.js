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
    * Retrieves an Entity given a Tenant and Tag, including the latest revision
    * @param {string} tenant The tenant name.
    * @param {string} tag The tag name.
    * @returns The RuleSet.
    */
    async getEntityByTag(tenant, tag) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-entity-by-tag", 
                tenant,
                tag)
            )
               
        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Gets all entities for a tenant.
    * @param {String} name The name of the tenant.
    * @returns The tenant.
    */
    async getEntities(tenant) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-entities", 
                tenant)
            )

        console.debug(result)

        if (result.data.length > 0) {     
            return {
                code: 200,
                body: {
                    status: "success",
                    data: result.data 
                }        
            }
        }
        else {
            return {
                code: 404,
                body: {
                    status: "entities not found",
                    data: null
                }        
            }
        }
    }

    /**
    * Retrieves an entity given an ID, including latest revision
    * @param {string} id The entity id.
    * @returns The entity.
    */
    async getEntityById(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-entity-by-ref", 
                id)
            )
                
        return {
            code: result.code,
            body: result.body
        }
    }
  
    /**
    * Retrieves an entity given a tenant, tag and revision number and returnes the entity and specified revision.
    * @param {string} tenant The tenant name.
    * @param {string} tag The tag name.
    * @param {string} revision The revision number.
    * @returns The entity.
    */
    async getEntityByTagAndRevision(tenant, tag, revision) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-entity-by-tag-and-revision", 
                tenant, tag, revision)
            )
                
        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Retrieves an entity and Revision given a entity revision identifier.
    * @param {string} id The entity revision identifier.
    * @returns The entity.
    */
    async getEntityByRevisionRef(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("get-entity-by-revisionref", 
                id)
            )
            
        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Creates a new entity and entity revision.
    * @param {entity} name The entity object.
    * @returns The entity ids.
    */
    async createEntity(entity) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("create-entity", 
                entity.user,
                entity.tenant,
                entity.name,
                entity.tag,
                entity.description,
                entity.definition)
            )
        return {
            code: result.code,
            body: result.body
        }
    }

    /**
    * Updates an entity.
    * @param {string} id The entity id.
    * @param {entity} name The entity object.
    * @returns The entity ids.
    */
    async updateEntity(id, entity) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("update-entity", 
                id,
                entity.timeStamp,
                entity.name,
                entity.tag,
                entity.description
                )
            )
        
        return {
            code: result.code,
            body: result.body
        }
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
    async updateEntityRevision(id, entity) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("update-entity-revision", 
                id,
                entity.timeStamp,
                entity.user,
                entity.definition,
                entity.status
                )
            )
        
        return {
            code: result.code,
            body: result.body
        }
    }

    

    /**
     * This function deletes an entity revision. If the revision does not exist,
     * or a newer revision exists, or the revision is not a draft, or the revision is linked to a ruleset
     * this function returns an error. The entity's head revision will be the latest revision, post deletion.
     * If the entity does not have a head revision, the entire entity will be deleted. 
     * @param {string} id The ID of the revision to delete. 
     * @returns The result of the operation.
     */
    async deleteEntityRevision(id) {
        const client = this._getClient()

        const result = await client.query(
            q.Call("delete-entity-revision", 
                id
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