export default async function ({ app: { $auth, $axios } }) {
  if (!$auth.loggedIn) {
    return
  }
  const appMetaData = $auth.$storage.getUniversal('appMetaData')
  if (!appMetaData) {
    try {
      const token = $auth.getToken('auth0')
      $axios.setToken(token)

      // const token = await $auth.getTokenSilently()
      // console.log(token)
      const { data } = await $axios.post('http://localhost:7071/api/userInfo')
      $auth.$storage.setUniversal('appMetaData', data, false)
    } catch (err) {
      console.log(err)
    }
  }
}
