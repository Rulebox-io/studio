import axios from 'axios'
import { magic } from '../plugins/magic'

export const state = () => ({
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  tenants: [],
  authenticated: false,
})

export const mutations = {
  SET_USER_DATA(state, user) {
    state.id = user.id
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.email = user.email
    state.tenants = user.tenants
    state.authenticated = true
  },
  CLEAR_USER_DATA(state) {
    state.id = null
    state.firstName = null
    state.lastName = null
    state.email = null
    state.tenants = null
    state.authenticated = false
    this.$router.push('/login')
  },
}

export const actions = {

  async login({ commit }, email) {
    const didToken = await magic.auth.loginWithMagicLink(email)
    const { data } = await axios.get(
      `${process.env.studioApiUrl}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${didToken}`
        }
      }
    )

    console.log(data);
    commit('SET_USER_DATA', data)
  },
  async logout({ commit }) {
    await magic.user.logout()
    commit('CLEAR_USER_DATA')
  },
}
