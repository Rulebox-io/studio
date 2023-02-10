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
  <NuxtLink :to="profileLink" class="flex flex-col flex-shrink-0">
    <div class="flex items-center justify-between">
      <div>
        <p
          class="text-base font-medium text-gray-900 dark:text-gray-300 md:text-sm">
          {{ name }}
        </p>
        <p
          class="text-base font-medium text-gray-600  md:text-xs">
          Account settings
        </p>
      </div>
      <CommonAvatar :url="url" :name="name"> </CommonAvatar>
    </div>
  </NuxtLink>
</template>
