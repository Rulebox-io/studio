<template>
  <CFlex background-color="gray.50" flex="1 0" direction="row">
    <CBox :width="$chakra.theme.container" mx="auto" background-color="white">
      <CFlex p="4" align="center">
        <CHeading as="h2" font-size="4xl">
          Users
        </CHeading>
        <CButton ml="auto">
          Add user
        </CButton>
      </CFlex>
      <CBox as="section" p="4">
        <CStack spacing="4">
          <CStack
            is-inline
            border-bottom="1px"
            border-bottom-color="gray.200"
            mb="4"
            py="4"
          >
            <CFlex w="33.33%" is-inline align="center">
              <CBox as="span" font-weight="500">
                User
              </CBox>
            </CFlex>
            <CFlex w="25%" is-inline align="center">
              <CBox as="span" font-weight="500">
                Name
              </CBox>
            </CFlex>
            <CFlex w="25%" is-inline align="center">
              <CBox as="span" font-weight="500">
                Roles
              </CBox>
            </CFlex>
            <CFlex w="16.67%" is-inline align="center">
              <CBox as="span" font-weight="500">
&nbsp;
              </CBox>
            </CFlex>
          </CStack>
          <CBox v-if="$fetchState.pending" py="2">
            Retrieving users
          </CBox>
          <CPseudoBox
            v-for="user in users"
            v-else
            :key="user.email"
            display="flex"
          >
            <CStack w="33.33%" is-inline align="center">
              <CAvatar
                :name="user.name"
                :src="user.picture"
              />
              <CText font-weight="500">
                {{ user.email }}
              </CText>
            </CStack>
            <CFlex w="25%" align="center">
              {{ user.name }}
            </CFlex>
            <CStack w="25%" is-inline align="center">
              <CBadge v-for="role in user.roles" :key="role">
                {{ role }}
              </CBadge>
            </CStack>
            <CStack w="16.67%" is-inline align="center">
              <CButton ml="auto">
                Edit
              </CButton>
            </CStack>
          </CPseudoBox>
        </CStack>
      </CBox>
    </CBox>
  </CFlex>
</template>

<script>
import {
  CAvatar,
  CBadge,
  CBox,
  CButton,
  CFlex,
  CHeading,
  CPseudoBox,
  CStack,
  CText
} from '@chakra-ui/vue'

export default {
  components: {
    CAvatar,
    CBadge,
    CBox,
    CButton,
    CFlex,
    CHeading,
    CPseudoBox,
    CStack,
    CText
  },
  async fetch () {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get('http://localhost:7071/api/Teppa/users')
      this.users = data
      console.log(this.users)
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
  data () {
    return {
      users: []
    }
  }
}
</script>

<style>
</style>
