<script setup>
  import {useStore} from "@/store/user"

  const store = useStore()

  const signOut = () => {
    store.logout()
  }
</script>
<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
    <h1
      class="mb-2 flex items-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
      Profile
      <CommonButton class="ml-auto" @click="signOut">Sign out</CommonButton>
    </h1>
  </div>
</template>
