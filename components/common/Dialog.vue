<template>
  <div
    v-show="open"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <transition
        name="dialog-overlay-transition"
        enter-active-class="transition-opacity ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
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
        leave-to-class="sm:scale-95 opacity-0 -translate-y-4"
      >
        <div
          v-if="open"
          class="
            relative
            inline-block
            align-bottom
            bg-white
            dark:bg-gray-900
            rounded-lg
            px-4
            pt-5
            pb-4
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
          "
        >
          <div><slot /></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: { open: Boolean },
}
</script>