<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1
        class="
          flex
          items-center
          text-2xl
          font-semibold
          text-gray-900
          dark:text-gray-100
        "
      >
        Users
        <Button class="ml-auto">Invite user</Button>
      </h1>
    </div>
    <div
      v-if="!$fetchState.pending"
      class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4"
    >
      <UserList :users="users"></UserList>
    </div>
  </div>
</template>
<script>
import UserList from '@/components/users/UserList'
import Button from '@/components/common/Button'
export default {
  components: { UserList, Button },
  middleware: 'magicauth',
  data() {
    return {
      users: [],
    }
  },
  async fetch() {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(
        `${process.env.studioApiUrl}/api/${this.$route.params.tenant}/users`
      )
      this.users = data
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
}
</script>