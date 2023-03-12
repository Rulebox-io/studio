<script setup>
  import {useStore} from "@/store/user"
  import {buildNavigation} from "./utils"

  const userStore = useStore()

  const navigation = buildNavigation({tenants: userStore.tenants})

  const name = userStore.displayName
  const picture = null
</script>
<template>
  <div
    class="inset-0 z-40 hidden w-[232px] flex-col border-r border-r-desaturated-300 border-opacity-50 dark:border-r-desaturated-600 dark:border-opacity-50 md:flex">
    <div class="mb-12 flex items-center justify-between p-4">
      <div class="flex items-center space-x-2">
        <IconsRuleboxIcon
          class="h-8 w-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
        <IconsRuleboxTypeIcon
          class="h-6 text-gray-900 dark:text-white"></IconsRuleboxTypeIcon>
      </div>
      <CommonAvatar size="sm" :url="picture" :name="name"> </CommonAvatar>
    </div>

    <nav class="flex flex-col space-y-2 px-4">
      <template v-for="item in navigation" :key="item.name">
        <span
          v-if="!item.href"
          class="flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-400">
          <component :is="item.icon" class="h-6 w-6"></component>
          <span class="ml-3">{{ item.name }}</span>
        </span>
        <NuxtLink
          v-else
          :to="item.href"
          class="flex items-center rounded-md border px-4 py-2 text-base font-medium"
          :class="
            item.current
              ? 'border-transparent bg-rulebox-600 text-white dark:border-[#B0A2CD] dark:border-opacity-50 dark:bg-[#322B40] dark:bg-opacity-50 '
              : 'border-transparent text-gray-900 hover:bg-rulebox-200 dark:text-white dark:hover:bg-desaturated-800'
          ">
          <component :is="item.icon" class="h-6 w-6"></component>
          <span class="ml-3">{{ item.name }}</span>
        </NuxtLink>
      </template>
    </nav>
  </div>
</template>
