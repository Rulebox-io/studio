<script setup>
  const myProps = defineProps({
    status: {type: String, required: true},
  })

  const labelStyle = computed(() => {
    switch (myProps.status) {
      case "published":
        return "text-green-700 border-green-700 dark:text-green-500 dark:border-green-500"
      default:
        return "text-gray-700 border-gray-700 dark:text-gray-500 dark:border-gray-500"
    }
  })

  const display = computed(() => {
    switch (myProps.status) {
      case "published":
        return "Published"
      case "draft":
        return "Draft"
      default:
        return "Draft"
    }
  })
</script>

<template>
  <CommonLabel :class="labelStyle" class="w-20 justify-center text-sm">
    {{ display }}</CommonLabel
  >
</template>
