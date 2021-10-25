/* eslint-disable eqeqeq */
const Store = require('../../../service/store/faunadb-store')
const Rulebox = require('../../../service/rulebox/rulebox')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {

    // Get the tenant from the route /key/:tenant
    const tenant = event.queryStringParameters.tenant;
    const name = event.queryStringParameters.name;

    console.log(`Invoking ${event.httpMethod} keys/${tenant}/${name}`)

    // Use the Store module to retrieve the keys, or make changes to a key.
    const store = new Store(process.env.FAUNADB_SECRET);
    const rbx = new Rulebox(process.env.RULEBOX_API_URL, process.env.RULEBOX_SUBSCRIPTION_KEY)

    switch (event.httpMethod) {
      case "GET": {
        const keys = await store.getApiKeys(tenant)

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(keys),
          // // more keys you can return:
          // headers: { "headerName": "headerValue", ... },
          // isBase64Encoded: true,
        }
      }

      case "POST": {
        const subscriptionKey = await rbx.createApiSubscription(tenant, name)
        const created = await store.createApiKey(tenant, name, subscriptionKey.name, subscriptionKey.primary, subscriptionKey.secondary)

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

      case "DELETE": {
        const deleted = await store.deleteApiKey(tenant, name)
        if (undefined == deleted) {
          return { statusCode: 404, headers }
        } else {
          switch (deleted.status) {
            case "success":
              return { statusCode: 200, headers };

            default:
              return { statusCode: 400, headers, body: `Could not delete key '${name}'` }
          }
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
