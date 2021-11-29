const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const roles = ["contributor", "publisher", "administrator"]
const RULEBOX_SESSION_COOKIE = "rb_session"

/**
 * The User class handles authentication and authorisation based
 * on user tokens.
 */
module.exports = class User {

  // constructor
  // ===========
  /**
   * Constructs a new User instance using the provided HTTP event object.
   * This constructor parses the user details embedded in the JTW token
   * that is contained in the Rulebox session cookie.
   * @param {Event} event The HTTP event object.
   */
  constructor(event) {

    this.hasSession = false
    this.user = null

    const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
    if (!cookies) return

    const rulebox = cookies[RULEBOX_SESSION_COOKIE];
    if (!rulebox) return

    // Verify that the token is valid.
    const user = jwt.verify(rulebox, process.env.JWT_SECRET)
    console.log(user)

    this.hasSession = true
    this.user = user
  }



  // Public properties
  // =================
  static contributor = "contributor"
  static publisher = "publisher"
  static administrator = "administrator"



  // Public functions
  // ================
  /**
   * Authorises a user. This function checks that the user has a level of access.
   * @param {String} tenant The tenant.
   * @param {String} role The requested role.
   * @returns True if the user has the role, or access above the role.
   */
  authorise(tenant, role) {
    if (!this.hasSession) return false
    if (!this.user.tenants || !Array.isArray(this.user.tenants)) return false

    const membership = this.user.tenants[tenant]
    if (!membership) return false

    const claimed = roles.indexOf(role)
    const actual = roles.indexOf(membership)
    if (actual === -1 || claimed === -1) return false

    return actual >= claimed
  }
}