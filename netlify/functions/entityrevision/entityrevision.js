/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const Store = require('../../../service/store/faunadb-store')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {

    const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
    if (cookies == undefined || !cookies["rb-session"]) {
      return {
        headers,
        statusCode: 401,
        body: JSON.stringify("User not currently logged in"),
      }
    }

    // Verify that the token is valid.
    const user = jwt.verify(cookies["rb-session"], process.env.JWT_SECRET)
    console.log(user)

    // ==========

    // Get common query string parameters
    const tenant = event.queryStringParameters.tenant;
    const id = event.queryStringParameters.id;
    console.log(`Invoking ${event.httpMethod} entityrevision/${tenant}/${id}`)

    // 'id' is required.
    if (!id) { return { statusCode: 400, headers, body: "Missing 'id' parameter" } }

    // Use the Store module to retrieve entities.
    const store = new Store(process.env.FAUNADB_SECRET);

    switch (event.httpMethod) {
      case "PUT": {
        const timestamp = Number(event.queryStringParameters.timestamp);
        if (!event.body) { return { statusCode: 400, headers, body: "Missing body" } }
        const definition = JSON.parse(event.body)

        const result = await store.updateEntityRevision(id, timestamp, user.id, definition)

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
              headers, body: {
                status: result.status,
                sub_status: result.sub_status
              }
            }
          }

          default: { return { statusCode: 400, headers, body: result.message } }
        }
      }

      case "OPTIONS": { return { statusCode: 200, headers } }

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
