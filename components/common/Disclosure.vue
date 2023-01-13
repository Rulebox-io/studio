<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/20/solid'
</script>
<template>
      <Disclosure>
    <DisclosureButton class="w-full flex items-center justify-between font-bold text-lg rounded-md text-gray-900 h-lesserbutton pl-4 pr-[6px] bg-rulebox-200 dark:text-white dark:bg-desaturated-800 dark:focus:ring-rulebox-200">
      <span><slot name="title"></slot></span>
      <ChevronDownIcon class="w-5 h-"></ChevronDownIcon>
    </DisclosureButton>
    <DisclosurePanel class="text-gray-900">
        <span><slot></slot></span>
    </DisclosurePanel>
  </Disclosure>
</template>