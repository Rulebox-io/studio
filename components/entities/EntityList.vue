<script setup>
  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    entities: {type: Array, required: true},
  })

  const emit = defineEmits(["toggle"])

  function toggle(id) {
    emit("toggle", id)
  }
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="entity in entities" :key="entity.id">
      <EntitiesEntityListItem
        :entity="entity"
        @toggle="toggle"></EntitiesEntityListItem>
    </li>
  </ul>
</template>
