/* eslint-disable eqeqeq */
const Store = require('../../../service/store/faunadb-store')

const headers = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'POST'
};

const handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case "OPTIONS": { return { statusCode: 200, headers } }
      case "POST": {

        // Email is a required field.
        if (!event.body) { return { statusCode: 400, headers, body: "Missing body" } }
        const payload = JSON.parse(event.body)
        if (!payload.email) { return { statusCode: 400, headers, body: "Missing `Email` field." } }

        // Sign up the user by email and tenant.
        const store = new Store(process.env.FAUNADB_SECRET);
        const user = await store.signupUser(payload.email, payload.tenant)

        // Return the user.
        return {
          statusCode: 200,
          body: JSON.stringify(user.data),
        }
      }

      default: { return { statusCode: 405, headers } }

    }
  } catch (error) {
    return { statusCode: 500, headers, body: error.toString() }
  }
}

module.exports = { handler }
