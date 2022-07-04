import axios from "axios"
import {defineStore} from "pinia"
import {Magic} from "magic-sdk"

export const useStore = defineStore("user", {
  state: () => {
    return {
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      tenants: {},
      authenticated: false,
    }
  },

  getters: {
    displayName: (state) => {
      if (!state.lastName || !state.firstName) {
        return state.email
      }
      return `${state.firstName} ${state.lastName}`
    },
  },

  actions: {
    SET_USER_DATA(user) {
      this.$patch({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenants: user.tenants,
        authenticated: true,
      })
    },

    CLEAR_USER_DATA() {
      this.$patch({
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        tenants: null,
        authenticated: false,
      })
    },

    async login(email) {
      // Log in through magic link, and create a session.
      const config = useRuntimeConfig()
      const magic = new Magic(config.public.magicPublishableKey)

      const didToken = await magic.auth.loginWithMagicLink(email)
      const {data} = await axios.post(
        `${config.public.studioApiUrl}/login`,
        {email: email.email},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${didToken}`,
          },
        }
      )

      // Store the user data locally.
      this.SET_USER_DATA(data)

      // Navigate to the dashboard page.
      if (!data.tenants) {
        return
      }
      const tenants = Object.keys(data.tenants)
      if (!tenants || tenants.length === 0) {
        return
      }

      navigateTo(`/${tenants[0]}/integration/keys`)
    },
    async logout() {
      const config = useRuntimeConfig()

      await axios.post(`${config.public.studioApiUrl}/logout`, "", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      this.CLEAR_USER_DATA()
    },
  },
})
