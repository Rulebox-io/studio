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

        /**
     * Creates a new tenant.
     * @param {String} name The name of the tenant.
     * @returns The tenant.
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
     * Retrieves an entity given an entity identifier.
     * @param {string} id The entity identifier.
     * @returns The entity.
     */
    async getEntity(id) {
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