<script setup>
  import {useAppStore} from "@/store/app"
  import {useStore} from "@/store/user"
  import {
    XMarkIcon,
    AdjustmentsVerticalIcon,
    ArrowRightOnRectangleIcon,
  } from "@heroicons/vue/24/outline"
  import {buildNavigation} from "./utils"

  const appStore = useAppStore()
  const userStore = useStore()

  const isOpen = ref(appStore.mobileMenuOpen)

  appStore.$subscribe((_, state) => {
    isOpen.value = state.mobileMenuOpen
  })

  const navigation = buildNavigation({tenants: userStore.tenants})

  const name = userStore.displayName
  const picture = null

  function closeMobile() {
    appStore.mobileMenuOpen = false
  }
</script>
<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 z-40 flex flex-col bg-desaturated-100 dark:bg-desaturated-900 md:hidden">
    <div
      class="fixed inset-x-0 top-[-230px] -z-10 h-[350px] bg-gradient-to-r from-[rgba(255,170,0,1)] via-[rgba(132,70,255,1)] to-[rgba(1,255,1,1)] blur-[100px] dark:h-[270px] dark:from-[rgba(255,170,0,0.5)] dark:via-[rgba(132,70,255,0.5)] dark:to-[rgba(1,255,1,0.5)]"></div>
    <div class="mb-4 flex items-center justify-between p-4">
      <div class="flex items-center space-x-2">
        <IconsRuleboxIcon
          class="h-8 w-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
        <IconsRuleboxTypeIcon
          class="h-6 text-gray-900 dark:text-white"></IconsRuleboxTypeIcon>
      </div>
      <button @click="closeMobile">
        <XMarkIcon class="h-9 w-9 text-gray-900 dark:text-white"></XMarkIcon>
      </button>
    </div>

    <nav class="flex flex-col space-y-2 px-6">
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
          "
          @click="closeMobile">
          <component :is="item.icon" class="h-6 w-6"></component>
          <span class="ml-3">{{ item.name }}</span>
        </NuxtLink>
      </template>
    </nav>

    <div
      class="fixed inset-x-0 bottom-0 flex flex-col rounded-t-2xl bg-white px-6 pt-4 pb-6 text-gray-900 dark:bg-transparent dark:text-white">
      <SidebarProfile :name="name" :url="picture"></SidebarProfile>

      <nav class="mt-4 flex flex-col space-y-2">
        <a
          href="prefs"
          class="flex items-center border border-none px-4 py-2 text-base font-medium text-gray-900 dark:text-white">
          <AdjustmentsVerticalIcon class="h-6 w-6"></AdjustmentsVerticalIcon>
          <span class="ml-3">Preferences</span>
        </a>
        <a
          href="signout"
          class="flex items-center border border-none px-4 py-2 text-base font-medium text-gray-900 dark:text-white">
          <ArrowRightOnRectangleIcon
            class="h-6 w-6"></ArrowRightOnRectangleIcon>
          <span class="ml-3">Sign out</span>
        </a>
      </nav>
    </div>
  </div>
</template>
