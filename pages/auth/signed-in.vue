<template>
  <div class="container">
    <div class="label">Email</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.email }}
    </div>

    <div class="label">ID</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.id }}
    </div>

    <div class="label">First name</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.firstName }}
    </div>

    <div class="label">Lasr name</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ $store.state.user.lastName }}
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'magicauth',
  async fetch() {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(`${process.env.studioApiUrl}/user`, {
        withCredentials: true,
      })
      console.log(data)
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
}
</script>

<style>
.label {
  font-size: 12px;
  color: #6851ff;
  margin: 30px 0 5px;
}
.profile-info {
  font-size: 17px;
  word-wrap: break-word;
}
</style>
