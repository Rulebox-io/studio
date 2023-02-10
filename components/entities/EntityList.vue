<script setup>
  const myProps = defineProps({
    entities: {type: Array, required: true},
  })
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="entity in entities" :key="entity.id">
      <EntitiesEntityListItem :entity="entity"></EntitiesEntityListItem>
    </li>
  </ul>
</template>
