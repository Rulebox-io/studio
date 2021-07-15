<template>
  <button
    type="button"
    class="
      relative
      inline-flex
      flex-shrink-0
      h-6
      w-11
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors
      ease-in-out
      duration-200
      focus:outline-none
      focus:ring-2 focus:ring-offset-2
      dark-focus:ring-rulebox-500
      sm:ml-auto
    "
    :class="toggleClass"
    role="switch"
    aria-checked="false"
    aria-labelledby="auto-update-option-label"
    @click="onClick"
  >
    <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
    <span
      aria-hidden="true"
      class="
        inline-block
        h-5
        w-5
        rounded-full
        bg-white
        shadow
        transform
        ring-0
        transition
        ease-in-out
        duration-200
      "
      :class="toggleHeadClass"
    ></span>
  </button>
</template>
<script>
export default {
  props: { enabled: { type: Boolean, isRequired: true } },
  computed: {
    toggleClass() {
      return this.enabled ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
    },
    toggleHeadClass() {
      return this.enabled ? 'translate-x-5' : 'translate-x-0'
    },
  },
  methods: {
    onClick() {
      this.$emit('toggle', !this.enabled)
    },
  },
}
</script>