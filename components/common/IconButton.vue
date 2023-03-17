<script setup>
  const myProps = [
    {
      name: "disabled",
      type: Boolean,
      default: false,
    },
  ]

  const emit = defineEmits(["click"])

  function click() {
    emit("click")
  }
</script>
<template>
  <button
    :disabled="myProps.disabled"
    class="flex h-lesserbutton w-[33px] items-center justify-center rounded-md border border-rulebox-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 enabled:hover:border-transparent enabled:hover:bg-rulebox-200 disabled:text-gray-600 dark:border-desaturated-600 dark:text-white dark:focus:ring-rulebox-200 dark:focus:ring-offset-desaturated-900 dark:enabled:hover:border-desaturated-500 dark:enabled:hover:bg-desaturated-800"
    @click="click">
    <slot></slot>
  </button>
</template>
