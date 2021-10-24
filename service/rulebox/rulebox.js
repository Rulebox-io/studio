/* eslint-disable no-throw-literal */
/* eslint-disable eqeqeq */
const axios = require("axios")

module.exports = class Rulebox {

    // Constructor
    // ===========
    /**
     * Constructs a new Store instance.
     * @param {string} subscriptionKey The Rulebox master subscription key to use. 
     */
    constructor(baseUrl, subscriptionKey) {
        this.baseUrl = baseUrl
        this.subscriptionKey = subscriptionKey;
    }



    // Public functions
    // ================
    /**
     * Creates a new API subscription.
     * @param {string} tenant The name of the tenant.
     * @param {string} name The name of the subscription.
     */
    async createApiSubscription(tenant, name) {

        if (undefined == tenant) throw "Tenant must be a non-empty string"
        if (undefined == name) throw "Name must be a non-empty string"

        const qualifiedName = `${this.normaliseName(tenant)}_${this.normaliseName(name)}`

        const payload = { "clientname": qualifiedName }

        try {
            const result = await axios.put(
                `${this.baseUrl}//management/v1/subscription`,
                JSON.stringify(payload),
                {
                    headers: {
                        'rulebox-subscription-key': this.subscriptionKey
                    }
                });

            switch (result.status) {
                case 200:
                case 201:
                    return { name: qualifiedName, primary: result.data.primaryKey, secondary: result.data.secondaryKey }

                case 404:
                    throw { result: "notfound" }
                default:
                    throw { result: "internal_error" }
            }
        } catch (err) {
            throw { result: "api_error", err }
        }
    }



    // Private implementation
    // ======================
    /**
     * Normalises a name. This function converts a string to a normalised name string,
     * removing non-alphanumeric characters, and converting spaces to underscores.
     * @param {string} name The name string. 
     * @returns The normalised name string.
     */
    normaliseName(name) {
        if (undefined == name) return;
        return name.replace(/ /g, '_').replace(/[^0-9a-zA-Z_]/g, '').toLowerCase()
    }
}