<template>
  <div class="bg-white shadow dark:bg-gray-900 overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="user in users" :key="user.userId">
        <UserListItem :user="user"></UserListItem>
      </li>
    </ul>
  </div>
</template>
<script>
import UserListItem from './UserListItem'
export default {
  components: { UserListItem },
  props: { users: { type: Array, required: true } },
}
</script>