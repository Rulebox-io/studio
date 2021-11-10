/* eslint-disable require-await */
/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const RB_SESSION_EXPIRY = 7 * 24 * 3600 // 7 days, in seconds.

// 'Access-Control-Allow-Origin': '*',
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

        console.log(event)

        const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
        if (!cookies["rb-session"]) {
          return {
            headers,
            statusCode: 401,
            body: JSON.stringify("No Rulebox session"),
          }
        }

        const user = jwt.verify(cookies["rb-session"], process.env.JWT_SECRET)
        console.log(user)

        const payload = { ...user, exp: Math.floor((Date.now() / 1000) + RB_SESSION_EXPIRY) }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        const sessionCookie = cookie.serialize("rb-session", token, {
          secure: false, // Use DEV flag
          httpOnly: true,
          path: '/',
          maxAge: RB_SESSION_EXPIRY * 1000
        })

        return {
          statusCode: 200,
          headers: { ...headers, 'Set-Cookie': sessionCookie },
          body: JSON.stringify(user),
        }
      }
    }
  } catch (error) {
    console.log(error);
    return { statusCode: 500, headers, body: error.toString() }
  }
}

module.exports = { handler }
