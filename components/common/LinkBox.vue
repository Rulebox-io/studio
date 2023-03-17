<script setup>
  import {ChevronDownIcon} from "@heroicons/vue/20/solid"
  const myProps = defineProps({
    disabled: {type: Boolean, default: false},
  })
  const emit = defineEmits(["click"])

  function click() {
    emit("click")
  }
</script>
<template>
  <button
    :disabled="myProps.disabled"
    class="flex h-lesserbutton items-center space-x-2 rounded-md border border-rulebox-500 bg-none pl-4 pr-[6px] font-medium text-gray-900 enabled:hover:border-transparent enabled:hover:bg-rulebox-200 dark:border-desaturated-600 dark:text-white dark:focus:ring-rulebox-200 dark:focus:ring-offset-desaturated-900 dark:enabled:hover:border-desaturated-500 dark:enabled:hover:bg-desaturated-800"
    @click="click">
    <span class="inline-block truncate"><slot></slot></span>
    <ChevronDownIcon class="h-5 w-5"></ChevronDownIcon>
  </button>
</template>
