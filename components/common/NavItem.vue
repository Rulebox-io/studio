<template>
  <NuxtLink
    :to="href"
    :class="[
      current
        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
      'group flex items-center px-2 py-2 text-base md:text-sm font-medium rounded-md',
    ]"
  >
    <component
      :is="icon"
      :class="[
        current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
        'mr-4 md:mr-3 flex-shrink-0 h-6 w-6',
      ]"
      aria-hidden="true"
    />
    {{ name }}
  </NuxtLink>
</template>
<script>
export default {
  props: {
    icon: { type: Object, required: true },
    name: { type: String, required: true },
    href: { type: String, required: true },
    current: Boolean,
  },
}
</script>