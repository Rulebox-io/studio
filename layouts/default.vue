<template>
  <CThemeProvider>
    <CReset />
    <CFlex height="100vh" direction="column">
      <CFlex
        align="center"
        flex="0 0"
        py="2"
        px="4"
        background-color="brand.400"
        color="white"
      >
        <CStack :spacing="4" is-inline>
          <CBox background-color="white" w="10" h="10" rounded="5px" />
          <CInput
            variant="filled"
            placeholder="Entities, rules, etc."
            rounded="full"
            w="50"
            background-color="brand.300"
          />
        </CStack>
        <CStack ml="4" :spacing="4" is-inline>
          <CText font-weight="500">
            Entities
          </CText>
          <CText font-weight="500">
            Rule&nbsp;sets
          </CText>
        </CStack>
        <CStack :spacing="4" font-size="lg" is-inline ml="auto" align="center">
          <CText font-weight="700">
            Teppa
          </CText>
          <CAvatar v-if="isLoggedIn" :name="name" :src="picture" />
        </CStack>
      </CFlex>
      <Nuxt />
    </CFlex>
  </CThemeProvider>
</template>

<script>
import { CAvatar, CBox, CFlex, CInput, CReset, CStack, CText, CThemeProvider } from '@chakra-ui/vue'

export default {
  components: { CAvatar, CBox, CFlex, CInput, CReset, CStack, CText, CThemeProvider },
  computed: {
    isLoggedIn () { return this.$auth.loggedIn },
    name () { return this.isLoggedIn && this.$auth.user.name },
    picture () { return this.isLoggedIn && this.$auth.user.picture }
  },
  mounted () {
    console.log(this.$auth)
  }
}
</script>
