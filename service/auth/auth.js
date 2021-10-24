const axios = require("axios")
const qs = require('querystring')

/**
 * The Auth class implements Auth0 API functions, including role retrieval
 * for the current user, and user/role enumeration for the admin screen.
 */
module.exports = class Auth {

    /**
     * Constructs a new Auth instance.
     * @param {string} clientId The Auth0 client ID.
     * @param {string} secret The Auth0 client secret.
     */
    constructor(clientId, secret, domain) {
        this.clientId = clientId
        this.secret = secret
        this.domain = domain
        this.accessToken = { }
    }

    /**
     * Retrieves an access token. This function retrieves a token that
     * can be used in subsequent function calls.
     */
    async getAccessToken() {
        try {
            const payload = {
                grant_type: 'client_credentials',
                client_id: this.clientId,
                client_secret: this.secret,
                audience: `https://${this.domain}/api/v2/`
            };

            const { data: { access_token, token_type } } = await axios.post(
                `https://${this.domain}/oauth/token`,
                qs.stringify(payload),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

            this.accessToken = { token: access_token, type: token_type }

            return this.accessToken;
        }
        catch (err) {
            console.log(err);
        }
    }

    /**
     * Retrieves users. This function retrieves all users in the specified tenant.
     * @param {string} tenant The tenant
     * @returns The list of users, or an empty array if no users could be found.
     */
    async getUsers(tenant) {

        try {
            const query = `app_metadata.memberships.tenant:"${tenant}"`;
            const url = `https://${this.domain}/api/v2/users?q=${qs.escape(query)}`;
            const { data: result } = await axios.get(url, {
                headers: {
                    "Authorization": `${this.accessToken.type} ${this.accessToken.token}`
                }
            })

            if(undefined==result || 0==result.length) return [];

            var eligible = result.map(u => {
                const membership = u.app_metadata.memberships && u.app_metadata.memberships.find(m=>m.tenant==tenant);
                return { user: u, roles: membership && membership.roles };              
            }).filter(x=>undefined!=x.roles);

            return eligible.map(u=> { 
                
                return { 
                    userId: u.user.user_id, 
                    email: u.user.email, 
                    picture: u.user.picture, 
                    name: u.user.nickname,
                    roles: u.roles
                }; 
            });
        }
        catch (err) {
            console.log(err);
            return [];
        }    
    }

    /**
     * Retrieves user information given a auth0 sub.
     * @param {string} sub the user's sub.
     * @returns The user's data and metadata.
     */
    async getUserData(sub) {
        const { data: user } = await axios.get(`https://${this.domain}/api/v2/users/${sub}`, {
            headers: {
                "Authorization": `${this.accessToken.type} ${this.accessToken.token}`
            }
        })

        return user;
    }
}
