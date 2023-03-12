<script setup lang="ts">
  import {Bars3Icon} from "@heroicons/vue/24/outline"
  import {useAppStore} from "@/store/app"

  function openMobile() {
    const appStore = useAppStore()
    appStore.mobileMenuOpen = true
  }
</script>
<template>
  <div class="mb-4 flex items-center justify-between p-4 md:hidden">
    <div
      class="fixed inset-x-0 top-[-230px] -z-10 h-[270px] bg-gradient-to-r from-[rgba(255,170,0,1)] via-[rgba(132,70,255,1)] to-[rgba(1,255,1,1)] blur-[100px] dark:h-[270px] dark:from-[rgba(255,170,0,0.5)] dark:via-[rgba(132,70,255,0.5)] dark:to-[rgba(1,255,1,0.5)]"></div>

    <div class="flex items-center space-x-2">
      <IconsRuleboxIcon
        class="h-8 w-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
      <span
        class="flex flex-nowrap items-center space-x-2 border-l border-l-desaturated-500 pl-2 text-2xl font-medium leading-6 text-gray-900 dark:border-l-desaturated-300 dark:text-white"
        ><slot></slot
      ></span>
    </div>
    <button @click="openMobile">
      <Bars3Icon class="h-9 w-9 text-gray-900 dark:text-white"></Bars3Icon>
    </button>
  </div>
</template>
