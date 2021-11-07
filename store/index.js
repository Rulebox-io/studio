import { magic } from '../plugins/magic'

export const state = () => ({
  user: null,
  authenticated: false,
  token: null
})

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    state.authenticated = true
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  CLEAR_USER_DATA(state) {
    state.user = null
    state.authenticated = false
    this.$router.push('/login')
  },
}

export const actions = {
  async login({ commit }, email) {
    const didToken = await magic.auth.loginWithMagicLink(email)
    const userData = await magic.user.getMetadata()
    commit('SET_USER_DATA', userData)
    commit('SET_TOKEN', didToken)
    console.log(didToken)
  },
  async logout({ commit }) {
    await magic.user.logout()
    commit('CLEAR_USER_DATA')
  },
}
