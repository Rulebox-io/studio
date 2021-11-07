// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// eslint-disable-next-line require-await
const { Magic } = require('@magic-sdk/admin')
const magic = new Magic('sk_live_818DB17C25C2D872')

const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'

    magic.token.validate(event.headers.authorization.substring(7));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello, ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
