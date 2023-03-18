<script setup>
  import {ExclamationCircleIcon} from "@heroicons/vue/20/solid"
</script>
<template>
  <div
    class="flex min-h-[33px] items-start space-x-2 rounded-md bg-[#FFC2C2] py-2 px-4 dark:bg-[#300303]">
    <div class="mt-[2px]">
      <ExclamationCircleIcon
        class="h-5 w-5 text-[#910808] dark:text-[#FFCACA]" />
    </div>
    <div class="text-base font-medium text-[#910808] dark:text-[#FFCACA]">
      <slot></slot>
    </div>
  </div>
</template>
