<script setup>
  import {useStore} from "@/store/user"

  const store = useStore()
</script>

<template>
  <div class="container">
    <div class="label">Email</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ store.email }}
    </div>

    <div class="label">ID</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ store.id }}
    </div>

    <div class="label">First name</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ store.firstName }}
    </div>

    <div class="label">Lasr name</div>
    <div class="profile-info text-gray-700 dark:text-gray-300">
      {{ store.lastName }}
    </div>
  </div>
</template>

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
