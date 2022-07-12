/* eslint-disable eqeqeq */
const { stringify } = require('postcss');
const Store = require('../../../service/store/faunadb-store')

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

    console.log(`Invoking ${event.httpMethod} rule/${tenant}`)


    switch (event.httpMethod) {
      case "GET": {
          return {
            statusCode: 200,
            headers,
            body: "[{ \"id\" : \"123\" },{ \"id\" : \"246\" }]",
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
