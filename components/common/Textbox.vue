<script setup>
  const myProps = defineProps({
    modelValue: {type: String, required: true},
    disabled: {type: Boolean, default: false},
    placeholder: {type: String, default: ""},
  })
</script>
<template>
  <div
    class="flex h-lesserbutton items-center space-x-2 rounded-md border border-rulebox-500 bg-gray-50 px-4 text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-rulebox-500 focus-within:ring-offset-2 dark:border-desaturated-500 dark:bg-desaturated-800 dark:text-white dark:focus-within:ring-rulebox-200 dark:focus-within:ring-offset-desaturated-900">
    <slot></slot>
    <input
      :placeholder="myProps.placeholder"
      :value="model"
      :disabled="disabled"
      type="text"
      class="w-full bg-gray-50 focus:outline-none dark:bg-desaturated-800 dark:placeholder:text-[#b8b8b8]"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>
