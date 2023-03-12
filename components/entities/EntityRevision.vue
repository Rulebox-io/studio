<script setup>
  import {CubeIcon} from "@heroicons/vue/24/outline"

  const myProps = defineProps({
    entity: {type: Object, required: true},
    revision: {type: Object, required: true},
  })

  const name = computed(() => {
    return myProps.entity.name
  })

  const rev = computed(() => {
    return `Rev ${myProps.revision.revision}`
  })

  const status = computed(() => {
    return myProps.revision.status
  })
  const lastModified = computed(() => {
    return myProps.revision.last_modified_on
  })
</script>

<template>
  <div class="my-2 flex items-center justify-between">
    <p
      class="truncate text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100">
      <CubeIcon class="inline-block h-5 w-5"></CubeIcon>

      {{ name }}
      <CommonBadge
        class="ml-2 border-2 border-solid border-blue-500 bg-transparent text-blue-500"
        >{{ rev }}</CommonBadge
      >
    </p>
    <div class="ml-2 flex flex-shrink-0 items-center dark:text-white">
      <time class="mr-1.5 text-sm" :datetime="lastModified">{{
        lastModified
      }}</time>
      <EntitiesStatusLabel :status="status"></EntitiesStatusLabel>
    </div>
  </div>
</template>
