<script setup>
  import {computed} from "vue"

  const myProps = defineProps({
    id: {type: String, required: true},
    url: {type: String, required: true},
    display: {type: String, required: true},
    selected: {type: Boolean, required: true},
  })

  const itemClass = computed(() => {
    return myProps.selected
      ? "bg-rulebox-100 text-rulebox-700 dark:bg-rulebox-800 dark:text-rulebox-100"
      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
  })
</script>

<template>
  <NuxtLink
    :to="url"
    class="rounded-md px-3 py-2 text-sm font-medium"
    :class="itemClass">
    {{ display }}
  </NuxtLink>
</template>
