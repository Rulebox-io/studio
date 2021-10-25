<template>
  <button
    type="button"
    :disabled="disabled"
    :class="buttonStyle"
    class="
      inline-flex
      items-center
      px-3
      py-2
      border border-transparent
      text-base
      sm:text-sm
      leading-4
      font-medium
      rounded-md
      shadow-sm
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rulebox-500
    "
    @click="onclick"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    secondary: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    buttonStyle() {
      return this.secondary === true
        ? 'border-gray-300 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'
        : 'border-transparent bg-rulebox-600 hover:bg-rulebox-700 text-white'
    },
  },
  methods: {
    onclick() {
      this.$emit('click')
    },
  },
}
</script>