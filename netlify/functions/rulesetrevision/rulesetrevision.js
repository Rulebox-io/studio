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
    const tenant = event.queryStringParameters.tenant;
    const id = event.queryStringParameters.id;
    const tag = event.queryStringParameters.tag;
    const revision = event.queryStringParameters.revision;


    console.log(`Invoking ${event.httpMethod} rule/${id}`)

    const store = new Store(process.env.FAUNADB_SECRET);

    switch (event.httpMethod) {
      case "GET": {
        if (!!tag && !!revision) {
          const revNumber = Number(revision)
          const result = await store.getRuleSetByTagAndRevision(tenant, tag, revNumber)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
        else if (!!id) {

          const result = await store.getRuleSetByRevisionRef(id)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
      }
      case "PUT": {

        const body = JSON.parse(event.body);

        if (undefined == body.user) { return { statusCode: 400, headers, body: "Missing 'user' field" } }
        if (undefined == body.entityRevisionId) { return { statusCode: 400, headers, body: "Missing 'entityRevisionId' field" } }
        if (true == isNaN(body.entityRevisionId)) { return { statusCode: 400, headers, body: "Invalid 'entityRevisionId'" } }
        if (undefined == body.definition) { return { statusCode: 400, headers, body: "Missing 'definition' field" } }     
        if (undefined == body.timeStamp) { return { statusCode: 400, headers, body: "Missing 'timeStamp' field" } }     

        const result = await store.updateRuleSetRevision(id, body)

        console.debug(result)

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
