<script setup>
  import {computed} from "vue"

  const myProps = defineProps({
    secondary: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    variant: {type: String, default: "primary"},
  })

  const emit = defineEmits(["click"])

  const buttonStyle = computed(() => {
    if(myProps.secondary === true || myProps.variant === "secondary")
      return "h-fullbutton border-desaturated-500 text-gray-900 enabled:hover:border-transparent enabled:hover:bg-rulebox-200 dark:text-white dark:enabled:hover:bg-rulebox-700 "
    else if(myProps.variant === "lesser")
     return "h-lesserbutton border-transparent bg-rulebox-500 enabled:hover:bg-rulebox-400 text-white"
     else return "h-fullbutton border-transparent bg-gradient-to-r from-rulebox-500 to-leftshift-600 enabled:hover:from-rulebox-400 enabled:hover:to-leftshift-500 text-white"
  })

  const onclick = () => {
    emit("click")
  }
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="buttonStyle"
    class="inline-flex items-center justify-center space-x-2 rounded-md border px-[34px] text-base font-medium leading-4 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:focus:ring-rulebox-200"
    @click="onclick">
    <slot />
  </button>
</template>
