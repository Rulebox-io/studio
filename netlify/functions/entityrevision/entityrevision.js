/* eslint-disable eqeqeq */
const Store = require('../../../service/store/faunadb-store');
const User = require('../../../service/auth/User');

const headers = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {

    // Handle OPTIONS
    if (event.httpMethod === "OPTIONS") { return { statusCode: 200, headers } }

    // Get common query string parameters
    const tenant = event.queryStringParameters.tenant;
    const id = event.queryStringParameters.id;
    console.log(`Invoking ${event.httpMethod} entityrevision/${tenant}/${id}`)

    // Does the user have contributor access to this tenant?
    const user = new User(event)
    if (!user.hasSession) { return { statusCode: 401, headers, body: "Not authenticated" } }
    if (!user.authorise(tenant, User.contributor)) { return { statusCode: 403, headers, body: "Not authorised" } }

    // 'id' is required.
    if (!id) { return { statusCode: 400, headers, body: "Missing 'id' parameter" } }

    // Use the Store module to retrieve entities.
    const store = new Store(process.env.FAUNADB_SECRET);

    switch (event.httpMethod) {
      case "PUT": {
        const timestamp = Number(event.queryStringParameters.ts);
        if (!event.body) { return { statusCode: 400, headers, body: "Missing body" } }
        const definition = JSON.parse(event.body)

        const result = await store.updateEntityRevision(id, timestamp, user.user.id, definition)

        switch (result.status) {
          case "success": {
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify(result.data)
            }
          }

          case "not-found": { return { statusCode: 404, headers } }

          case "precondition-failed": {
            return {
              statusCode: 400,
              headers, body: JSON.stringify({
                status: result.status,
                sub_status: result.sub_status
              })
            }
          }

          default: { return { statusCode: 400, headers, body: result.message } }
        }
      }

      case "DELETE": {
        const result = await store.deleteEntityRevision(id)
        switch (result.status) {
          case "success": {
            if (result.data) return { statusCode: 200, body: JSON.stringify(result.data), headers }
            else return { statusCode: 204, headers }
          }
          case "not-found": { return { statusCode: 404, headers } }
          case "precondition-failed": {
            return {
              statusCode: 400,
              headers, body: JSON.stringify({
                status: result.status,
                sub_status: result.sub_status
              })
            }
          }

          default: { return { statusCode: 400, headers, body: result.message } }
        }
      }

      default: {
        return {
          statusCode: 405,
          headers,
          body: "Method not allowed"
        }
      }
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
