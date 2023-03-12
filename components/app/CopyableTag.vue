<script setup>
  import {ClipboardDocumentIcon} from "@heroicons/vue/20/solid"
</script>
<template>
  <div
    class="flex h-lesserbutton w-full items-center justify-between rounded-md bg-gray-50 px-4 font-mono font-medium text-gray-900 dark:bg-desaturated-800 dark:text-white">
    <span><slot /></span>
    <ClipboardDocumentIcon class="h-5 w-5" />
  </div>
</template>
