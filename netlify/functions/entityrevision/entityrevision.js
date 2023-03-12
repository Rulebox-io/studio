/* eslint-disable eqeqeq */
const Store = require("../../../service/store/faunadb-entity-store")
const User = require("../../../service/auth/User")

const headers = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
}

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {
    // Handle OPTIONS
    if (event.httpMethod === "OPTIONS") {
      return {statusCode: 200, headers}
    }

    // Get common query string parameters
    const tenant = event.queryStringParameters.tenant
    const id = event.queryStringParameters.id
    const tag = event.queryStringParameters.tag
    const revision = event.queryStringParameters.revision

    console.log(`Invoking ${event.httpMethod} entityrevision/${tenant}/${id}`)

    // Does the user have contributor access to this tenant?
    //const user = new User(event)
    //if (!user.hasSession) { return { statusCode: 401, headers, body: "Not authenticated" } }
    //if (!user.authorise(tenant, User.contributor)) { return { statusCode: 403, headers, body: "Not authorised" } }

    // 'id' is required.
    //if (!id) { return { statusCode: 400, headers, body: "Missing 'id' parameter" } }

    // Use the Store module to retrieve entities.
    const store = new Store(process.env.FAUNADB_SECRET)

    switch (event.httpMethod) {
      case "GET": {
        if (!!tag && !!revision) {
          // A tag and identifier were provided, so we attempt to
          // fetch the entity and revision data.
          const revNumber = Number(revision)
          const result = await store.getEntityByTagAndRevision(
            tenant,
            tag,
            revNumber
          )

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        } else if (id) {
          // We fetch a single entity revision.
          const result = await store.getEntityByRevisionRef(id)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
        return {
          statusCode: 400,
          headers,
          body: "Expected tag and revision or id",
        }
      }
      case "PUT": {
        if (id) {
          const body = JSON.parse(event.body)

          if (undefined == body.user) {
            return {statusCode: 400, headers, body: "Missing 'user' field"}
          }
          if (undefined == body.definition) {
            return {
              statusCode: 400,
              headers,
              body: "Missing 'definition' field",
            }
          }
          if (undefined == body.status) {
            return {statusCode: 400, headers, body: "Missing 'status' field"}
          }
          if (undefined == body.timeStamp) {
            return {statusCode: 400, headers, body: "Missing 'timeStamp' field"}
          }

          const result = await store.updateEntityRevision(id, body)

          console.debug(result)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        } else {
          return {statusCode: 400, headers}
        }
      }
      case "DELETE": {
        const result = await store.deleteEntityRevision(id)

        return {
          statusCode: result.code,
          headers,
          body: JSON.stringify(result.body),
        }
      }

      default: {
        return {
          statusCode: 405,
          headers,
          body: "Method not allowed",
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {statusCode: 500, body: error.toString()}
  }
}

module.exports = {handler}
