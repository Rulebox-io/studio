<script setup>
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@headlessui/vue"
  import {ChevronDownIcon} from "@heroicons/vue/20/solid"
  const myProps = defineProps({
    model: {type: Object, required: true},
    options: {type: Array, required: true},
  })
</script>
<template>
  <Listbox v-model="myProps.model">
    <div class="relative">
      <ListboxButton
        class="flex h-lesserbutton items-center justify-between space-x-4 rounded-md border border-rulebox-500 bg-gray-50 pl-[10px] pr-[6px] focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:border-desaturated-500 dark:bg-desaturated-800 dark:text-white dark:focus:ring-rulebox-200 dark:focus:ring-offset-desaturated-900">
        <span class="font-medium text-gray-900 dark:text-white">{{
          myProps.model.name
        }}</span>
        <ChevronDownIcon
          class="h-5 w-5 text-gray-900 dark:text-white"></ChevronDownIcon>
      </ListboxButton>
      <ListboxOptions
        class="absolute right-0 z-[999] mt-1 max-h-60 overflow-auto rounded-md border border-desaturated-300 bg-gray-50 py-4 text-base shadow-lg focus:outline-none dark:border-desaturated-700 dark:bg-desaturated-900">
        <ListboxOption
          v-for="option in options"
          :key="option.id"
          v-slot="{active}"
          :value="option"
          as="template">
          <li
            class="flex h-lesserbutton cursor-default select-none items-center px-4 font-medium"
            :class="{
              'bg-rulebox-600 text-white': active,
              'bg-gray-50 text-gray-900 dark:bg-desaturated-900 dark:text-white':
                !active,
            }">
            <span class="block truncate">{{ option.name }}</span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
