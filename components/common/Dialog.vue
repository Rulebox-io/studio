<script setup>
  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    open: {type: Boolean, required: true},
  })
</script>

<template>
  <div
    v-show="open"
    class="fixed inset-0 z-10 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
    <div
      class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <transition
        name="dialog-overlay-transition"
        enter-active-class="transition-opacity ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0">
        <div
          v-if="open"
          class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          aria-hidden="true"></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:h-screen sm:align-middle"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->

      <transition
        name="menu-transition"
        enter-active-class="transition-opacity ease-out duration-300 transform"
        enter-class="sm:scale-95 opacity-0 -translate-y-4"
        enter-to-class="sm:scale-100 opacity-100 -translate-y-0"
        leave-active-class="transition-opacity ease-in duration-200 transform"
        leave-class="sm:scale-100 opacity-100 -translate-y-0"
        leave-to-class="sm:scale-95 opacity-0 -translate-y-4">
        <div
          v-if="open"
          class="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div><slot /></div>
        </div>
      </transition>
    </div>
  </div>
</template>
