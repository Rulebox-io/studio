<script lang="ts" setup>
  // Comment to force a build 20220715.01

import "./assets/css/tailwind.css"

  import {Bars3Icon} from "@heroicons/vue/24/outline"

  useHead({
    title: "Rulebox Studio",
    // or, instead:
    // titleTemplate: (title) => `My App - ${title}`,
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    charset: "utf-8",
    meta: [{name: "description", content: "Rule Management for everyone"}],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}],
  })

</script>

<template>
  <div class="flex h-screen overflow-hidden bg-desaturated-100 dark:bg-desaturated-900">
    <SidebarMobile></SidebarMobile>
    <main class="relative z-0 flex w-0 flex-1 flex-col overflow-y-auto focus:outline-none">
      <NuxtPage />
    </main>
  </div>
  <!--
      <div class="pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-500 dark:hover:text-gray-100"
          @click="openMobileSideBar">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon></Bars3Icon>
        </button>
      </div>
      <main
        class="relative z-0 flex-1 overflow-y-auto focus:outline-none ">

  -->
</template>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  body {
    @apply dark:bg-gray-600;
  }
</style>
