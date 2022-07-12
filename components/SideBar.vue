<script setup>
  import {computed} from "vue"

  import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XIcon,
  } from "@heroicons/vue/outline"
  import {useStore} from "@/store/user"

  defineProps({open: {type: Boolean, default: false}})

  const emit = defineEmits(["close"])

  const store = useStore()
  const route = useRoute()

  const navigation = computed(() => {
    return [
      {name: "Dashboard", href: "/", icon: HomeIcon, current: true},
      {name: "Entities", href: "~/entities", icon: UsersIcon, current: false},
      {name: "Rules", href: "~/rules", icon: FolderIcon, current: false},
      {name: "Tests", href: "~/tests", icon: CalendarIcon, current: false},
      {
        name: "Integration",
        href: "~/integration/keys",
        icon: InboxIcon,
        current: false,
      },
      {name: "Reports", href: "~/reports", icon: ChartBarIcon, current: false}
    ].map((nav) => ({
      ...nav,
      href: nav.href.replace("~", `/${route.params.tenant}`),
    }))
  })

  const isLoggedIn = computed(() => store.authenticated)
  const name = computed(() => isLoggedIn.value && store.displayName)
  const picture = computed(() => isLoggedIn.value && store.avatar)

  const emitClose = () => emit("close")
</script>

<template>
  <div class="sidebar-switch contents">
    <div
      v-show="open"
      class="fixed inset-0 z-40 flex md:hidden"
      role="dialog"
      aria-modal="true">
      <transition
        name="menu-overlay-transition"
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0">
        <div
          v-if="open"
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"></div>
      </transition>
      <transition
        name="menu-transition"
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-class="-translate-x-full"
        enter-to-class="-translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-class="-translate-x-0"
        leave-to-class="-translate-x-full">
        <div
          v-if="open"
          class="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-black">
          <transition
            name="menu-close-transition"
            enter-active-class="transition ease-in-out duration-300"
            enter-class="opcacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in-out duration-300"
            leave-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="open" class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="emitClose">
                <span class="sr-only">Close sidebar</span>
                <!-- Heroicon name: outline/x -->
                <XIcon class="h-6 w-6 text-white"></XIcon>
              </button>
            </div>
          </transition>

          <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div class="flex flex-shrink-0 items-center px-4">
              <div class="bg-image=url('~/assets/logo.svg') h-8"></div>
              <nuxt-link
                to="/"
                class="h-8 w-full bg-rulebox-logo bg-contain bg-no-repeat dark:bg-rulebox-logo-dark"></nuxt-link>
            </div>
            <nav class="mt-5 space-y-1 px-2 dark:bg-black">
              <NuxtLink
                v-for="nav in navigation"
                :key="nav.name"
                :to="nav.href"
                class="group flex items-center rounded-md px-2 py-2 text-base font-medium md:text-sm"
                :class="[
                  nav.current
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                    : 'dark:bg-dark-900 text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
                ]">
                <component
                  :is="nav.icon"
                  class="mr-4 h-6 w-6 flex-shrink-0 md:mr-3"
                  :class="[
                    nav.current
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                  ]"
                  aria-hidden="true" />
                {{ nav.name }}
              </NuxtLink>
            </nav>
          </div>
          <div
            class="flex flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-800">
            <SidebarProfile
              v-if="isLoggedIn"
              :name="name"
              :url="picture"></SidebarProfile>
          </div>
        </div>
      </transition>
      <div class="w-14 flex-shrink-0">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex w-64 flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="flex h-0 flex-1 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div class="flex flex-shrink-0 items-center px-4">
              <nuxt-link
                to="/"
                class="h-8 w-full bg-rulebox-logo bg-contain bg-no-repeat dark:bg-rulebox-logo-dark"></nuxt-link>
            </div>
            <nav class="mt-5 flex-1 space-y-1 bg-white px-2 dark:bg-gray-900">
              <NuxtLink
                v-for="nav in navigation"
                :key="nav.name"
                :to="nav.href"
                class="group flex items-center rounded-md px-2 py-2 text-base font-medium md:text-sm"
                :class="[
                  nav.current
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                    : 'dark:bg-dark-900 text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
                ]">
                <component
                  :is="nav.icon"
                  class="mr-4 h-6 w-6 flex-shrink-0 md:mr-3"
                  :class="[
                    nav.current
                      ? 'text-gray-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                  ]"
                  aria-hidden="true" />
                {{ nav.name }}
              </NuxtLink>
            </nav>
          </div>
          <div
            class="flex flex-shrink-0 border-t border-gray-200 p-4 dark:border-gray-800">
            <SidebarProfile
              v-if="isLoggedIn"
              :name="name"
              :url="picture"></SidebarProfile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
