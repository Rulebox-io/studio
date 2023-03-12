<script setup>
  import {XMarkIcon} from "@heroicons/vue/20/solid"
  const emit = defineEmits(["click"])
  const myProps = defineProps({
    labelColor: {type: String, required: true},
  })
  const bg = computed(() => {
    return {background: myProps.labelColor}
  })
</script>
<template>
  <button
    class="flex items-center space-x-2 rounded-full border border-rulebox-500 px-[8px] py-[6px] text-sm font-medium text-gray-900 dark:border-desaturated-600 dark:text-white"
    @click="emit('click')">
    <span class="h-[10px] w-[10px] rounded-full" :style="bg" />
    <span><slot /></span>
    <XMarkIcon class="h-5 w-5" />
  </button>
</template>
