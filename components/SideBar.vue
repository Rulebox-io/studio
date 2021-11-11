<template>
  <div class="sidebar-switch">
    <div
      v-show="open"
      class="fixed inset-0 flex z-40 md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <transition
        name="menu-overlay-transition"
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        ></div>
      </transition>
      <transition
        name="menu-transition"
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-class="-translate-x-full"
        enter-to-class="-translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-class="-translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="open"
          class="
            relative
            flex-1 flex flex-col
            max-w-xs
            w-full
            bg-white
            dark:bg-black
          "
        >
          <transition
            name="menu-close-transition"
            enter-active-class="transition ease-in-out duration-300"
            enter-class="opcacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in-out duration-300"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div v-if="open" class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                class="
                  ml-1
                  flex
                  items-center
                  justify-center
                  h-10
                  w-10
                  rounded-full
                  focus:outline-none
                  focus:ring-2
                  focus:ring-inset
                  focus:ring-white
                "
                @click="emitClose"
              >
                <span class="sr-only">Close sidebar</span>
                <!-- Heroicon name: outline/x -->
                <XIcon class="h-6 w-6 text-white"></XIcon>
              </button>
            </div>
          </transition>

          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <div class="h-8 bg-image=url('~/assets/logo.svg')"></div>
              <div
                class="
                  h-8
                  w-full
                  bg-rulebox-logo bg-contain bg-no-repeat
                  dark:bg-rulebox-logo-dark
                "
              ></div>
            </div>
            <nav class="mt-5 px-2 space-y-1 dark:bg-black">
              <NavItem
                v-for="nav in navigation"
                :key="nav.name"
                :name="nav.name"
                :href="nav.href"
                :icon="nav.icon"
                :current="nav.current"
              ></NavItem>
            </nav>
          </div>
          <div
            class="
              flex-shrink-0 flex
              border-t border-gray-200
              dark:border-gray-800
              p-4
            "
          >
            <Profile v-if="isLoggedIn" :name="name" :url="picture"></Profile>
          </div>
        </div>
      </transition>
      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="
            flex flex-col
            h-0
            flex-1
            border-r border-gray-200
            bg-white
            dark:border-gray-800 dark:bg-gray-900
          "
        >
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <div
                class="
                  h-8
                  w-full
                  bg-rulebox-logo bg-contain bg-no-repeat
                  dark:bg-rulebox-logo-dark
                "
              ></div>
            </div>
            <nav class="mt-5 flex-1 px-2 bg-white dark:bg-gray-900 space-y-1">
              <NavItem
                v-for="nav in navigation"
                :key="nav.name"
                :name="nav.name"
                :href="nav.href"
                :icon="nav.icon"
                :current="nav.current"
              ></NavItem>
            </nav>
          </div>
          <div
            class="
              flex-shrink-0 flex
              border-t border-gray-200
              dark:border-gray-800
              p-4
            "
          >
            <Profile v-if="isLoggedIn" :name="name" :url="picture"></Profile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeIcon from '@/components/heroIcons/outline/HomeIcon'
import UsersIcon from '@/components/heroIcons/outline/UsersIcon'
import FolderIcon from '@/components/heroIcons/outline/FolderIcon'
import CalendarIcon from '@/components/heroIcons/outline/CalendarIcon'
import InboxIcon from '@/components/heroIcons/outline/InboxIcon'
import ChartBarIcon from '@/components/heroIcons/outline/ChartBarIcon'
import XIcon from '@/components/heroIcons/outline/XIcon'
import NavItem from '@/components/common/NavItem'
import Profile from './sidebar/Profile.vue'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Entities', href: '~/entities', icon: UsersIcon, current: false },
  { name: 'Rules', href: '~/entities', icon: FolderIcon, current: false },
  { name: 'Tests', href: '~/tests', icon: CalendarIcon, current: false },
  {
    name: 'Integration',
    href: '~/integration/keys',
    icon: InboxIcon,
    current: false,
  },
  { name: 'Reports', href: '~/reports', icon: ChartBarIcon, current: false },
]

export default {
  components: { NavItem, Profile, XIcon },
  props: { open: Boolean },
  data() {
    return {
      navigation: navigation.map((nav) => ({
        ...nav,
        href: nav.href.replace('~', `/${this.$route.params.tenant}`),
      })),
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.authenticated
    },
    name() {
      return this.isLoggedIn && this.$store.getters['user/displayName'] // Name
    },
    picture() {
      return this.isLoggedIn && '' // this.$store.state.user.avatar // How?
    },
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="postcss" scoped>
div.sidebar-switch {
  display: contents;
  .dark img {
    border: solid 2px blue;
  }
}
</style>