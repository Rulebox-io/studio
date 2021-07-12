<template>
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-3
      py-2
      border border-transparent
      text-sm
      leading-4
      font-medium
      rounded-md
      shadow-sm
      text-white
      bg-rulebox-600
      hover:bg-rulebox-700
      focus:outline-none
      focus:ring-2 focus:ring-offset-2 focus:ring-rulebox-500
    "
    @click="onclick"
  >
    <slot />
  </button>
</template>
<script>
export default {
  methods: {
    onclick() {
      this.$emit('click')
    },
  },
}
</script>