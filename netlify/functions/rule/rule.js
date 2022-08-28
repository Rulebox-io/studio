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

        if (undefined == body.user) { return { statusCode: 400, headers, body: "Missing 'user' field" } }
        if (undefined == body.tenant) { return { statusCode: 400, headers, body: "Missing 'tenant' field" } }
        if (undefined == body.name) { return { statusCode: 400, headers, body: "Missing 'name' field" } }
        if (undefined == body.description) { return { statusCode: 400, headers, body: "Missing 'description' field" } }
        if (undefined == body.tag) { return { statusCode: 400, headers, body: "Missing 'tag' field" } }
        if (undefined == body.entityRevisionId) { return { statusCode: 400, headers, body: "Missing 'entityRevisionId' field" } }
        //if (false == Number.isInteger(body.entityRevisionId)) { return { statusCode: 400, headers, body: "Invalid 'entityRevisionId'" } }
        if (undefined == body.test) { return { statusCode: 400, headers, body: "Missing 'test' field" } }

        const result = await store.createRuleSet(body)

        console.debug(result)

        if (undefined == result) {
          return { statusCode: 400, headers, body: `Key with name ${name} already exists` }
        }

        return { statusCode: result.code, headers, body: JSON.stringify(result.body) }
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
    return 
    { 
      statusCode: 500//, 
      //body: error.errors()[0].cause[0].description 
    }
  }
}

module.exports = { handler }
