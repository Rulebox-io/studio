<script setup>
  import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue"
  import {ChevronDownIcon} from "@heroicons/vue/20/solid"
</script>
<template>
  <div
    class="flex flex-col rounded-md border border-desaturated-200 bg-gray-50 py-2 pl-4 pr-[6px] text-gray-900 dark:border-desaturated-800 dark:bg-desaturated-800 dark:text-white">
    <Disclosure>
      <DisclosureButton
        class="flex h-[20px] items-center justify-between text-lg font-bold focus:ring-rulebox-500 dark:focus:ring-rulebox-200">
        <span><slot name="title"></slot></span>
        <ChevronDownIcon class="h- w-5"></ChevronDownIcon>
      </DisclosureButton>
      <DisclosurePanel class="mt-6 mb-2 pr-[8px] text-gray-900 dark:text-white">
        <span><slot></slot></span>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
