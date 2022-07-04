<script setup>
  import {computed} from "vue"

  const myProps = defineProps({
    secondary: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
  })

  const emit = defineEmits(["click"])

  const buttonStyle = computed(() => {
    return myProps.secondary === true
      ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-transparent dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
      : "border-transparent bg-rulebox-600 hover:bg-rulebox-700 text-white"
  })

  const onclick = () => {
    emit("click")
  }
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="buttonStyle"
    class="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-base font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 sm:text-sm"
    @click="onclick">
    <slot />
  </button>
</template>
