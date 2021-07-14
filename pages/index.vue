<template>
  <h1>Homepage</h1>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    const userInfo = store.$auth.$storage.getUniversal('ruleboxUserData')
    if (
      userInfo &&
      userInfo.memberships &&
      Array.isArray(userInfo.memberships)
    ) {
      if (userInfo.memberships.length > 0) {
        return redirect(`/${userInfo.memberships[0].tenant}/account/profile`)
      }
    }
  },
}
</script>

