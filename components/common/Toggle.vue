<script setup>
  const myProps = defineProps({
    selected: {type: String, required: true},
  })

  const emit = defineEmits(["select"])

  function click(which) {
    if (which === myProps.selected) {
      return
    }

    emit("select", which)
  }
</script>
<template>
  <div class="flex flex-nowrap">
    <button
      class="flex h-lesserbutton w-[33px] items-center justify-center rounded-l-md border border-rulebox-500 text-gray-900 focus:z-10 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 disabled:text-gray-600 dark:border-desaturated-600 dark:text-white dark:focus:ring-rulebox-200"
      :class="
        selected === 'left'
          ? 'bg-rulebox-200 dark:bg-desaturated-700'
          : 'bg-white enabled:hover:bg-rulebox-100 dark:bg-desaturated-900 dark:enabled:hover:border-desaturated-500 dark:enabled:hover:bg-desaturated-800'
      "
      @click="click('left')">
      <slot name="left"></slot>
    </button>
    <button
      class="relative left-[-1px] flex h-lesserbutton w-[33px] items-center justify-center rounded-r-md border border-rulebox-500 text-gray-900 focus:z-10 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 disabled:text-gray-600 dark:border-desaturated-600 dark:text-white dark:focus:ring-rulebox-200"
      :class="
        selected === 'right'
          ? 'bg-rulebox-200 dark:bg-desaturated-700'
          : 'bg-white enabled:hover:bg-rulebox-100 dark:bg-desaturated-900 dark:enabled:hover:border-desaturated-500 dark:enabled:hover:bg-desaturated-800'
      "
      @click="click('right')">
      <slot name="right"></slot>
    </button>
  </div>
</template>
