/* eslint-disable eqeqeq */
const Store = require('../../../service/store/faunadb-entity-store')

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

    console.log(`Invoking ${event.httpMethod} entity/${tenant}`)
    
    // Use the Store module to retrieve entities.
    const store = new Store(process.env.FAUNADB_SECRET);

    switch (event.httpMethod) {
      case "GET": {
        if (!!tag && !!revision) {
          // A tag and identifier were provided, so we attempt to
          // fetch the entity and revision data.
          const revNumber = Number(revision)
          const result = await store.getEntityByTagAndRevision(tenant, tag, revNumber)
          
          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
        else if (tag) {
          // A tag was provided, so we attempt to
          // fetch the entity's HEAD revision.
          const result = await store.getEntityByTag(tenant, tag)
          
          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
        else if (!id) {
          // No ID was specified so we fetch entity header records.
          let entities = await store.getEntities(tenant)
          if (!entities) entities = []

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(entities),
          }
        } else {
          // We fetch a single entity revision.
          const result = await store.getEntity(id)
          
          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
      }

      case "POST": {

        const body = JSON.parse(event.body);

        if (undefined == body.user) { return { statusCode: 400, headers, body: "Missing 'user' field" } }
        if (undefined == body.tenant) { return { statusCode: 400, headers, body: "Missing 'tenant' field" } }
        if (undefined == body.name) { return { statusCode: 400, headers, body: "Missing 'name' field" } }
        if (undefined == body.description) { return { statusCode: 400, headers, body: "Missing 'description' field" } }
        if (undefined == body.tag) { return { statusCode: 400, headers, body: "Missing 'tag' field" } }
        if (undefined == body.definition) { return { statusCode: 400, headers, body: "Missing 'definition' field" } }

        const result = await store.createEntity(body)

        console.debug(result)

        // if (undefined == result) {
        //   return { statusCode: 400, headers, body: `Key with name ${name} already exists` }
        // }

        return { statusCode: result.code, headers, body: JSON.stringify(result.body) }
      }

      case "PUT": {
        if (id) {
          
          const body = JSON.parse(event.body);

          if (undefined == body.user) { return { statusCode: 400, headers, body: "Missing 'user' field" } }
          if (undefined == body.definition) { return { statusCode: 400, headers, body: "Missing 'definition' field" } }     
          if (undefined == body.timeStamp) { return { statusCode: 400, headers, body: "Missing 'timeStamp' field" } }   

          const result = await store.updateEntity(id, body)

          console.debug(result)

          return { statusCode: result.code, headers, body: JSON.stringify(result.body) }
        }
        else {
          return { statusCode: 400, headers }
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
