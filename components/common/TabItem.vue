<template>
  <NuxtLink
    :to="url"
    class="px-3 py-2 font-medium text-sm rounded-md"
    :class="itemClass"
  >
    {{ display }}
  </NuxtLink>
</template>
<script>
export default {
  props: {
    id: { type: String, required: true },
    url: { type: String, required: true },
    display: { type: String, required: true },
    selected: { type: Boolean, required: true },
  },
  computed: {
    itemClass() {
      return this.selected
        ? 'bg-rulebox-100 text-rulebox-700 dark:bg-rulebox-800 dark:text-rulebox-100'
        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
    },
  },
}
</script>