<script setup>
  const myProps = defineProps({
    labelColor: {type: String, required: true},
  })

  const bg = computed(() => {
    return {background: myProps.labelColor}
  })
</script>
<template>
  <div
    class="flex items-center space-x-2 px-[8px] py-[6px] text-sm font-medium text-gray-900 dark:text-white">
    <span class="h-[10px] w-[10px] rounded-full" :style="bg" />
    <span><slot /></span>
  </div>
</template>
