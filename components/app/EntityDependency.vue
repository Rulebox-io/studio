<script setup>
  import {CubeIcon, ChevronDoubleRightIcon} from "@heroicons/vue/24/outline"

  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    name: {type: String, required: true},
    revision: {type: Number, required: true},
    status: {type: String, required: true},
    rulesets: {type: Array, required: false, default: () => []},
  })
</script>
<template>
  <div
    class="flex flex-col space-y-2 text-base font-medium text-gray-900 dark:text-white">
    <div class="flex items-center space-x-4">
      <CubeIcon class="h-6 w-6" />
      <span>{{ name }}</span>
      <AppRevisionLabel :revision="revision" :status="status" />
    </div>
    <div
      v-for="ruleset in rulesets"
      :key="ruleset.id"
      class="flex items-center space-x-4">
      <ChevronDoubleRightIcon class="h-6 w-6" />
      <CubeIcon class="h-6 w-6" />
      <span class="text-gray-700 dark:text-gray-200">{{ ruleset.name }}</span>
      <AppRevisionLabel :revision="ruleset.revision" :status="ruleset.status" />
    </div>
  </div>
</template>
