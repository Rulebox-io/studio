<template>
  <div class="bg-white shadow dark:bg-gray-900 overflow-hidden sm:rounded-md">
    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="entity in entities" :key="entity.id">
        <EntityListItem :entity="entity"></EntityListItem>
      </li>
    </ul>
  </div>
</template>
<script>
import EntityListItem from './EntityListItem'
export default {
  components: { EntityListItem },
  props: { entities: { type: Array, required: true } },
}
</script>