<script setup>
  import {CubeIcon} from "@heroicons/vue/24/outline"
  import {PencilIcon} from "@heroicons/vue/20/solid"

  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    what: {type: String, required: true},
    display: {type: String, required: true},
    description: {type: String, required: true},
    tag: {type: String, required: true},
    labels: {type: Array, required: true},
  })
  const emit = defineEmits(["click"])
</script>
<template>
  <div
    class="flex flex-col space-y-4 rounded-md border-2 border-rulebox-500 bg-gray-50 px-4 py-6 text-base font-medium text-gray-900 dark:border-desaturated-300 dark:bg-gradient-radial dark:from-desaturated-700 dark:to-desaturated-800 dark:text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <CubeIcon class="h-6 w-6"></CubeIcon>
        <span>{{ display }}</span>
      </div>
      <button
        class="flex h-lesserbutton w-[33px] items-center justify-center rounded-md border border-rulebox-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:border-desaturated-500 dark:bg-desaturated-800 dark:focus:ring-rulebox-200 dark:focus:ring-offset-desaturated-900 md:hidden"
        @click="emit('click', 'mobile')">
        <PencilIcon class="h-5 w-5"></PencilIcon>
      </button>
      <button
        class="hidden h-lesserbutton w-[33px] items-center justify-center rounded-md border border-rulebox-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:border-desaturated-500 dark:bg-desaturated-800 dark:focus:ring-rulebox-200 dark:focus:ring-offset-desaturated-900 md:flex"
        @click="emit('click', 'desktop')">
        <PencilIcon class="h-5 w-5"></PencilIcon>
      </button>
    </div>
    <div class="max-h-12 overflow-clip text-gray-700 dark:text-gray-200">
      {{ description }}
    </div>
    <div class="flex items-center space-x-5">
      <AppTag class="bg-rulebox-100 dark:bg-desaturated-700">{{ tag }}</AppTag>
      <AppLabel v-for="label in labels" :key="label" label-color="#6AFFE4">{{
        label
      }}</AppLabel>
    </div>
  </div>
</template>
