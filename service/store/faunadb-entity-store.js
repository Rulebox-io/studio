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
        
        return {
            body: result.data
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
                entity.userId,
                entity.definition
                )
            )
        
        return {
            code: result.code,
            body: result.body
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