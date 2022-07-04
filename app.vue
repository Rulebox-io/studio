<script lang="ts" setup>
  // Comment to force a build 20220704.01

import "./assets/css/tailwind.css"

  import {MenuIcon} from "@heroicons/vue/outline"

  useHead({
    title: "Rulebox Studio",
    // or, instead:
    // titleTemplate: (title) => `My App - ${title}`,
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    charset: "utf-8",
    meta: [{name: "description", content: "Rule Management for everyone"}],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  })

  const isMobileOpen = ref(false)
  const closeMobileSideBar = () => (isMobileOpen.value = false)
  const openMobileSideBar = () => (isMobileOpen.value = true)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-white dark:bg-black">
    <SideBar :open="isMobileOpen" @close="closeMobileSideBar"></SideBar>
    <div class="flex w-0 flex-1 flex-col overflow-hidden">
      <div class="pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-500 dark:hover:text-gray-100"
          @click="openMobileSideBar">
          <span class="sr-only">Open sidebar</span>
          <MenuIcon></MenuIcon>
        </button>
      </div>
      <main
        class="relative z-0 flex-1 overflow-y-auto bg-gray-100 focus:outline-none dark:bg-black">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style lang="postcss">
  @font-face {
    font-family: UntitledSans;
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url("~/assets/fonts/untitled-sans/UntitledSans-Regular.ttf")
        format("truetype"),
      url("~/assets/fonts/untitled-sans/UntitledSans-Regular.woff2?3.13")
        format("woff2");
  }

  @font-face {
    font-family: UntitledSans;
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url("~/assets/fonts/untitled-sans/UntitledSans-Medium.ttf")
        format("truetype"),
      url("~/assets/fonts/untitled-sans/UntitledSans-Medium.woff2?3.13")
        format("woff2");
  }

  @font-face {
    font-family: UntitledSans;
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: url("~/assets/fonts/untitled-sans/UntitledSans-RegularItalic.ttf")
        format("truetype"),
      url("~/assets/fonts/untitled-sans/UntitledSans-RegularItalic.woff2?3.13")
        format("woff2");
  }

  @font-face {
    font-family: UntitledSans;
    font-weight: bold;
    font-style: normal;
    font-display: swap;
    src: url("~/assets/fonts/untitled-sans/UntitledSans-Bold.ttf")
        format("truetype"),
      url("~/assets/fonts/untitled-sans/UntitledSans-Bold.woff2?3.13")
        format("woff2");
  }

  body {
    @apply dark:bg-gray-600;
  }
</style>
