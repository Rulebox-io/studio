export default async function ({ app: { $auth, $axios } }) {
  if (!$auth.loggedIn) {
    return
  }
  try {
    // Now that we've logged in, we update axios to include a token with
    // every request to the Rulebox API.
    const token = $auth.getToken('auth0')
    $axios.setToken(token)
    console.log(token)

    // Have we stored user info yet? If we haven't, then retrieve it.
    const userInfo = $auth.$storage.getUniversal('ruleboxUserData')
    if (!userInfo) {
      const { data } = await $axios.post(`${process.env.studioApiUrl}/api/userInfo`)
      $auth.$storage.setUniversal('ruleboxUserData', data, false)
    }
  } catch (err) {
    // What should we do?
  }
}
