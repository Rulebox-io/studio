/* eslint-disable eqeqeq */
const { Magic } = require('@magic-sdk/admin')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const magic = new Magic('sk_live_818DB17C25C2D872')

const headers = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

const handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case "OPTIONS": { return { statusCode: 200, headers } }
      case "POST":
      case "GET": {

        // Confirm that the user is logged in.
        const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
        if (cookies == undefined || !cookies["rb-session"]) {
          return {
            headers,
            statusCode: 401,
            body: JSON.stringify("User not currently logged in"),
          }
        }

        // Verify that the token is valid.
        const user = jwt.verify(cookies["rb-session"], process.env.JWT_SECRET)

        // Log the user out of Magic.
        try {
          await magic.users.logoutByIssuer(user.id);
        } catch (error) {
          console.log('User\'s session with Magic already expired');
        }

        // Create a "deleted" cookie.
        const sessionCookie = cookie.serialize("rb-session", "", {
          secure: false, // Use DEV flag
          httpOnly: true,
          path: '/',
          expires: new Date(0)
        })

        // Return the user and metadata, and the cookie.
        return {
          statusCode: 200,
          headers: { ...headers, 'Set-Cookie': sessionCookie }
        }
      }
    }
  } catch (error) {
    return { statusCode: 500, headers, body: error.toString() }
  }
}

module.exports = { handler }
