<template>
  <CFlex background-color="gray.50" flex="1 0" justify="center" align="center">
    <CButton @click="logout">
      Log out
    </CButton>
  </CFlex>
</template>

<script>
import { CButton, CFlex } from '@chakra-ui/vue'

export default {
  components: { CButton, CFlex },
  methods: {
    logout () {
      this.$auth.logout()
      window.location = 'https://dev-bgsq8xes.eu.auth0.com/api/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000'
    }
  }
}
</script>

<style>
</style>
