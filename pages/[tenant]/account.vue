<script setup>
  const tabs = reactive([
    {
      id: "profile",
      display: "Profile",
      url: `profile`,
    },
    {
      id: "users",
      display: "Users",
      url: `users`,
    },
    {
      id: "billing",
      display: "Billing",
      url: `billing`,
    },
    {
      id: "other",
      display: "Other",
      url: `other`,
    },
  ])
</script>

<template>
  <div>
    <div class="bg-white py-4 shadow dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <CommonTabBar :tabs="tabs"></CommonTabBar>
      </div>
    </div>
    <NuxtChild class="py-6" />
  </div>
</template>
