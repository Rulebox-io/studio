<script setup>
  const myProps = defineProps({
    entities: {type: Array, required: true},
  })
</script>

<template>
  <div class="overflow-hidden bg-white shadow dark:bg-gray-900 sm:rounded-md">
    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="entity in entities" :key="entity.id">
        <EntitiesEntityListItem :entity="entity"></EntitiesEntityListItem>
      </li>
    </ul>
  </div>
</template>
