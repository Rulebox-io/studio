/* eslint-disable eqeqeq */
const { Magic } = require('@magic-sdk/admin')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const Store = require('../../../service/store/faunadb-store')

const RB_SESSION_EXPIRY = 7 * 24 * 3600 // 7 days, in seconds.

const magic = new Magic('sk_live_818DB17C25C2D872')

const headers = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type, authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

const isDevelopment = process.env.NODE_ENV || 'development'

const handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case "OPTIONS": { return { statusCode: 200, headers } }
      case "POST": {
        // Confirm that the log-in token is still valid.
        const didToken = event.headers.authorization.substring(7)
        magic.token.validate(didToken);
        const [, claim] = magic.token.decode(didToken)

        // Confirm that email was provided in the body.
        const body = JSON.parse(event.body);
        if (undefined == body.email) { return { statusCode: 400, headers, body: "Missing 'email' field" } }

        // Fetch the user given the email address. If this token was issued before the last log-in,
        // it's replayed from an earlier request and invalid.
        const store = new Store(process.env.FAUNADB_SECRET);
        const user = await store.getUserByEmail(body.email);
        if (undefined != user.data.lastLoginAt && claim.iat <= user.data.lastLoginAt) {
          return { statusCode: 401, body: "Token is not valid - replay detected" }
        }

        // Update the user's login to the timestamp of the token, and update its identifier as well
        // (in case we didn't have the user's identifier yet)
        await store.updateUserLogin(user.ref, claim.iss, claim.iat);

        // Create a JTW cookie that's a serialised user object.
        const payload = { ...(user.data), exp: Math.floor((Date.now() / 1000) + RB_SESSION_EXPIRY) }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        const sessionCookie = cookie.serialize("rb-session", token, {
          secure: !isDevelopment,
          httpOnly: true,
          path: '/',
          maxAge: RB_SESSION_EXPIRY * 1000
        })

        // Return the user and metadata, and the cookie.
        return {
          statusCode: 200,
          headers: { ...headers, 'Set-Cookie': sessionCookie },
          body: JSON.stringify(user.data),
        }
      }

      default: return { statusCode: 405, headers }
    }
  } catch (error) {
    return { statusCode: 500, headers, body: error.toString() }
  }
}

module.exports = { handler }
