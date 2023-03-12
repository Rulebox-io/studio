<script setup>
  import {Menu, MenuButton, MenuItems, MenuItem} from "@headlessui/vue"
  import {ChevronDownIcon} from "@heroicons/vue/20/solid"

  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    items: {type: Array, required: true},
  })
</script>
<template>
  <Menu as="div" class="relative h-9">
    <MenuButton
      class="flex h-lesserbutton w-[33px] items-center justify-center rounded-md bg-rulebox-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:bg-desaturated-700 dark:text-white dark:focus:ring-rulebox-200">
      <ChevronDownIcon class="h-5 w-5"></ChevronDownIcon>
    </MenuButton>
    <MenuItems
      class="absolute right-0 z-[999] mt-1 max-h-60 overflow-auto rounded-md border border-desaturated-300 bg-gray-50 py-4 text-base shadow-lg focus:outline-none dark:border-desaturated-700 dark:bg-desaturated-900"
      as="ul">
      <MenuItem v-for="item in items" :key="item.id" v-slot="{active}">
        <li
          class="flex h-lesserbutton cursor-default select-none items-center px-4 font-medium"
          :class="{
            'bg-rulebox-600 text-white': active,
            'bg-gray-50 text-gray-900 dark:bg-desaturated-900 dark:text-white':
              !active,
          }">
          <span class="block truncate">{{ item.name }}</span>
        </li>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
