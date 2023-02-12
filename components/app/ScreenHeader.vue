<script setup lang="ts">
  import { Bars3Icon } from '@heroicons/vue/24/outline';
  import { useAppStore } from '@/store/app'

  function openMobile() {

    const appStore = useAppStore()
    appStore.mobileMenuOpen = true
  }
</script>
<template>
    <div class="p-4 mb-4 flex items-center justify-between md:hidden">
      <div class="-z-10 fixed inset-x-0 top-[-230px] h-[270px] bg-gradient-to-r blur-[100px]  from-[rgba(255,170,0,1)] via-[rgba(132,70,255,1)] to-[rgba(1,255,1,1)]  dark:from-[rgba(255,170,0,0.5)] dark:via-[rgba(132,70,255,0.5)] dark:to-[rgba(1,255,1,0.5)] dark:h-[270px]"></div>
        
      <div class="flex items-center space-x-2">
        <IconsRuleboxIcon class="w-8 h-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
        <span class="flex items-center space-x-2 flex-nowrap pl-2 leading-6 text-2xl font-medium border-l border-l-desaturated-500 dark:border-l-desaturated-300 text-gray-900 dark:text-white"><slot></slot></span>
      </div>
      <button @click="openMobile">
        <Bars3Icon class="text-gray-900 dark:text-white w-9 h-9"></Bars3Icon>
        </button>
    </div>
</template>