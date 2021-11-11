/* eslint-disable eqeqeq */
export const state = () => ({
  darkMode: null
})

export const getters = {
  /**
   * Retrieves the value for 'dark mode', or the default value if no value was specified by the user.
   * @param {State} state The Vuex state.
   * @returns The value for 'dark mode'.
   */
  darkmodeOrDefault: state => defaultValue => {
    if (undefined != state.darkMode) return state.darkMode;
    return defaultValue; // OS default.
  }
}

export const mutations = {
  /**
   * Updates the user preference for 'dark mode'.
   * @param {State} state The Vuex state.
   * @param {boolean} newValue The new value for 'dark mode'.
   */
  setDarkMode(state, newValue) { console.log(newValue); state.darkMode = (newValue === true) }
}