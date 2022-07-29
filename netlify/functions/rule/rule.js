/* eslint-disable eqeqeq */
const { stringify } = require('postcss');
const Store = require('../../../service/store/faunadb-rule-store')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Content-Type': 'application/json',
};

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {
    

    // Get common query string parameters
    const id = event.queryStringParameters.id;

    console.log(`Invoking ${event.httpMethod} rule/${id}`)

    const store = new Store(process.env.FAUNADB_SECRET);

    switch (event.httpMethod) {
      case "GET": {
        const entity = await store.getRuleSet(id)
        if (!entity) { return { statusCode: 404, headers } }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(entity),
        }
      }
      case "POST": {

        const body = JSON.parse(event.body);
        //if (undefined == body.email) { return { statusCode: 400, headers, body: "Missing 'email' field" } }

        const created = await store.createRuleSet(body)

        if (undefined == created) {
          return { statusCode: 400, headers, body: `Key with name ${name} already exists` }
        }

        switch (created.status) {
          case "success":
            return { statusCode: 200, headers, body: JSON.stringify(created) }

          default:
            return { statusCode: 400, headers, body: `Could not create key '${name}'` }
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
