<script setup>
    import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
    import {ChevronDownIcon} from '@heroicons/vue/20/solid'
    const myProps = defineProps({
        model: {type: Object, required: true},
        options: {type: Array, required: true},
    })
</script>
<template>
    <Listbox v-model="myProps.model">
    <div class="relative">
      <ListboxButton
        class="flex items-center justify-between space-x-4 rounded-md bg-gray-50 border border-rulebox-500 h-lesserbutton pl-[10px] pr-[6px] focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-rulebox-500 dark:border-desaturated-500 dark:bg-desaturated-800 dark:text-white dark:focus:ring-rulebox-200">
        <span class="font-medium text-gray-900 dark:text-white">{{ myProps.model.name }}</span>
        <ChevronDownIcon class="w-5 h-5 text-gray-900 dark:text-white"></ChevronDownIcon>
      </ListboxButton>
      <ListboxOptions
        class="absolute z-[999] right-0 mt-1 max-h-60 overflow-auto rounded-md bg-gray-50 border border-desaturated-300 py-4 text-base shadow-lg focus:outline-none dark:bg-desaturated-900 dark:border-desaturated-700">
        <ListboxOption
          v-for="option in options"
          :key="option.id"
          :value="option"
          v-slot="{active}"
          as="template">
          <li
            class="font-medium px-4 h-lesserbutton cursor-default select-none flex items-center"
            :class="{
              'bg-rulebox-600 text-white': active,
              'bg-gray-50 text-gray-900 dark:text-white dark:bg-desaturated-900': !active,
            }">
            <span class="block truncate">{{ option.name }}</span>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>