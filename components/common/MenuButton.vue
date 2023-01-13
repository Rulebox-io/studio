<script setup>
  import {Menu, MenuButton, MenuItems, MenuItem} from "@headlessui/vue"
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";

    const myProps = defineProps(
    {
        items: {type: Array, required: true}
    })

</script>
<template>
    <Menu as="div" class="relative h-9">
    <MenuButton
      class="flex items-center justify-center bg-rulebox-200 text-gray-900 rounded-md w-[33px] h-lesserbutton focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rulebox-500 dark:bg-desaturated-700 dark:text-white dark:focus:ring-rulebox-200">
      <ChevronDownIcon class="w-5 h-5"></ChevronDownIcon>
    </MenuButton>
    <MenuItems
      class="absolute z-[999] right-0 mt-1 max-h-60 overflow-auto rounded-md bg-gray-50 border border-desaturated-300 py-4 text-base shadow-lg focus:outline-none dark:bg-desaturated-900 dark:border-desaturated-700"
      as="ul">
      <MenuItem
        v-for="item in items"
        :key="item.id"
        v-slot="{active}">
        <li
            class="font-medium px-4 h-lesserbutton cursor-default select-none flex items-center"
            :class="{
              'bg-rulebox-600 text-white': active,
              'bg-gray-50 text-gray-900 dark:bg-desaturated-900 dark:text-white': !active,
            }">
            <span class="block truncate">{{ item.name }}</span>
          </li>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>