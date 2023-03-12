<script setup>
  const myProps = defineProps({
    revision: {type: Number, required: true},
    status: {type: String, required: true},
  })
</script>
<template>
  <div
    class="items-align flex rounded-full border px-4 py-[5px] text-base font-medium"
    :class="
      myProps.status === 'published'
        ? 'border-green-500 bg-green-500 text-white'
        : 'border-desaturated-200 bg-none text-gray-900 dark:border-desaturated-300 dark:bg-desaturated-800 dark:text-white'
    ">
    Rev {{ myProps.revision }}
  </div>
</template>
