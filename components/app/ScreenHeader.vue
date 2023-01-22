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
      <div class="flex items-center space-x-2">
        <IconsRuleboxIcon class="w-8 h-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
        <span class="flex items-center space-x-2 flex-nowrap pl-2 leading-6 text-2xl font-medium border-l border-l-desaturated-500 dark:border-l-desaturated-300 text-gray-900 dark:text-white"><slot></slot></span>
      </div>
      <button @click="openMobile">
        <Bars3Icon class="text-gray-900 dark:text-white w-9 h-9"></Bars3Icon>
        </button>
    </div>
</template>