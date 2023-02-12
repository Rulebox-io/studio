<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/20/solid'
</script>
<template>
  <div class="pl-4 pr-[6px] py-2 flex flex-col rounded-md text-gray-900 bg-gray-50 border border-desaturated-200 dark:text-white dark:bg-desaturated-800 dark:border-desaturated-800">
    <Disclosure>
      <DisclosureButton class="h-[20px] flex items-center justify-between font-bold text-lg focus:ring-rulebox-500  dark:focus:ring-rulebox-200">
        <span><slot name="title"></slot></span>
        <ChevronDownIcon class="w-5 h-"></ChevronDownIcon>
      </DisclosureButton>
      <DisclosurePanel class="mt-6 mb-2 pr-[8px] text-gray-900 dark:text-white">
        <span><slot></slot></span>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>