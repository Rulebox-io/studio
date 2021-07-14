<template>
  <div class="h-screen flex overflow-hidden bg-white dark:bg-black">
    <SideBar :open="isMobileOpen" @close="closeMobileSideBar"></SideBar>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          class="
            -ml-0.5
            -mt-0.5
            h-12
            w-12
            inline-flex
            items-center
            justify-center
            rounded-md
            text-gray-500
            hover:text-gray-900
            focus:outline-none
            focus:ring-2 focus:ring-inset focus:ring-indigo-500
            dark:text-gray-500
            dark:hover:text-gray-100
          "
          @click="openMobileSideBar"
        >
          <span class="sr-only">Open sidebar</span>
          <!-- Heroicon name: outline/menu -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <main
        class="
          flex-1
          relative
          z-0
          overflow-y-auto
          focus:outline-none
          bg-gray-100
          dark:bg-black
        "
      >
        <nuxt />
      </main>
    </div>
  </div>
</template>
<script>
import SideBar from '@/components/SideBar'
export default {
  components: { SideBar },
  data() {
    return {
      isMobileOpen: false,
    }
  },
  methods: {
    openMobileSideBar() {
      this.isMobileOpen = true
    },
    closeMobileSideBar() {
      this.isMobileOpen = false
    },
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
