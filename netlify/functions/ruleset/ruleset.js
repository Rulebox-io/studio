/* eslint-disable eqeqeq */
const {stringify} = require("postcss")
const Store = require("../../../service/store/faunadb-rule-store")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
}

// eslint-disable-next-line require-await
const handler = async (event) => {
  try {
    // Get common query string parameters
    const tenant = event.queryStringParameters.tenant
    const id = event.queryStringParameters.id
    const tag = event.queryStringParameters.tag
    const revision = event.queryStringParameters.revision

    console.log(`Invoking ${event.httpMethod} rule/${id}`)

    const store = new Store(process.env.FAUNADB_SECRET)

    switch (event.httpMethod) {
      case "GET": {
        if (tag) {
          const result = await store.getRuleSetByTag(tenant, tag)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        } else if (!id) {
          const result = await store.getRuleSets(tenant)

          console.debug(result)

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result),
          }
        } else {
          const result = await store.getRulesetById(id)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        }
      }
      case "POST": {
        const body = JSON.parse(event.body)

        if (undefined == body.user) {
          return {statusCode: 400, headers, body: "Missing 'user' field"}
        }
        if (undefined == body.tenant) {
          return {statusCode: 400, headers, body: "Missing 'tenant' field"}
        }
        if (undefined == body.name) {
          return {statusCode: 400, headers, body: "Missing 'name' field"}
        }
        if (undefined == body.description) {
          return {statusCode: 400, headers, body: "Missing 'description' field"}
        }
        if (undefined == body.tag) {
          return {statusCode: 400, headers, body: "Missing 'tag' field"}
        }
        if (undefined == body.definition) {
          return {statusCode: 400, headers, body: "Missing 'definition' field"}
        }
        if (undefined == body.entityRevisionId) {
          return {
            statusCode: 400,
            headers,
            body: "Missing 'entityRevisionId' field",
          }
        }
        if (true == isNaN(body.entityRevisionId)) {
          return {statusCode: 400, headers, body: "Invalid 'entityRevisionId'"}
        }

        const result = await store.createRuleSet(body)

        console.debug(result)

        // if (undefined == result) {
        //   return { statusCode: 400, headers, body: `Key with name ${name} already exists` }
        // }

        return {
          statusCode: result.code,
          headers,
          body: JSON.stringify(result.body),
        }
      }
      case "PATCH": {
        if (id) {
          const body = JSON.parse(event.body)

          if (undefined == body.name) {
            return {statusCode: 400, headers, body: "Missing 'name' field"}
          }
          if (undefined == body.tag) {
            return {statusCode: 400, headers, body: "Missing 'tag' field"}
          }
          if (undefined == body.description) {
            return {
              statusCode: 400,
              headers,
              body: "Missing 'description' field",
            }
          }
          if (undefined == body.timeStamp) {
            return {statusCode: 400, headers, body: "Missing 'timeStamp' field"}
          }

          const result = await store.updateRuleset(id, body)

          console.debug(result)

          return {
            statusCode: result.code,
            headers,
            body: JSON.stringify(result.body),
          }
        } else {
          return {statusCode: 400, headers}
        }
      }

      default: {
        return {
          statusCode: 405,
          headers,
          body: "Method not allowed",
        }
      }
    }
  } catch (error) {
    console.error(error)
    return
    {
      500 //,
      //body: error.errors()[0].cause[0].description
    }
  }
}

module.exports = {handler}
