<script setup>
  import {computed} from "vue"

  defineProps({
    name: {type: String, required: true},
    url: {type: String, required: true},
  })

  const route = useRoute()
  const profileLink = computed(() => {
    return `/${route.params.tenant}/Account/Profile`
  })
</script>

<template>
  <NuxtLink :to="profileLink" class="group block flex-shrink-0 md:w-full">
    <div class="flex items-center">
      <CommonAvatar :url="url" :name="name"> </CommonAvatar>
      <div class="ml-3">
        <p
          class="text-base font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100 md:text-sm">
          {{ name }}
        </p>
        <p
          class="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 md:text-xs">
          View profile
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
