<template>
  <h2>Sign in</h2>
</template>
<script>
export default {
  mounted() {
    this.$auth.loginWith('auth0')
  },
}
</script>
