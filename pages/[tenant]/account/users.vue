<script setup>
  const route = useRoute()
  const config = useRuntimeConfig()

  const {pending, data: users} = useLazyFetch(
    `${config.public.studioApiUrl}/users?tenant=${route.params.tenant}`
  )
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1
        class="flex items-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Users
        <CommonButton class="ml-auto">Invite user</CommonButton>
      </h1>
    </div>
    <div v-if="!pending" class="mx-auto my-4 max-w-7xl px-4 sm:px-6 md:px-8">
      <UserList :users="users"></UserList>
    </div>
  </div>
</template>
