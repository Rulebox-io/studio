<script setup>
  const myProps = defineProps({
    users: {type: Array, required: true},
  })
</script>

<template>
  <div class="overflow-hidden bg-white shadow dark:bg-gray-900 sm:rounded-md">
    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="user in myProps.users" :key="user.userId">
        <UserListItem :user="user"></UserListItem>
      </li>
    </ul>
  </div>
</template>
