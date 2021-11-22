/* eslint-disable eqeqeq */
const Store = require('../../../service/store/faunadb-store')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {

    // Get the tenant from the route /entity/:tenant
    const tenant = event.queryStringParameters.tenant;

    console.log(`Invoking ${event.httpMethod} entity/${tenant}`)

    // Use the Store module to retrieve entities.
    const store = new Store(process.env.FAUNADB_SECRET);

    switch (event.httpMethod) {
      case "GET": {
        let entities = await store.getEntities(tenant)
        if (!entities) entities = []

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(entities),
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
