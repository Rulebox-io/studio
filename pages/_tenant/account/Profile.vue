<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h1
      class="
        flex
        items-center
        text-2xl
        font-semibold
        text-gray-900
        dark:text-gray-100
        mb-2
      "
    >
      Profile
      <Button class="ml-auto" @click="signOut">Sign out</Button>
    </h1>

    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="bg-white pt-6 px-4 sm:pt-6 sm:px-6 dark:bg-gray-900">
        <div>
          <h2
            id="payment-details-heading"
            class="
              text-lg
              leading-6
              font-medium
              text-gray-900
              dark:text-gray-100
            "
          >
            Preferences
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Manage your application and visual preferences.
          </p>
          <div class="mt-6">
            <dl class="divide-y divide-gray-200 dark:divide-gray-800">
              <div
                class="
                  pb-4
                  sm:pb-5
                  sm:grid
                  sm:grid-cols-3
                  sm:gap-4
                  sm:border-b
                  sm:border-gray-200
                  sm:dark:border-gray-800
                "
              >
                <dt
                  id="auto-update-option-label"
                  class="text-sm font-medium text-gray-500"
                >
                  Enable Dark Mode
                </dt>
                <dd
                  class="
                    mt-1
                    flex
                    text-sm text-gray-900
                    dark:text-gray-100
                    sm:mt-0 sm:col-span-2
                  "
                >
                  <Toggle
                    :enabled="enableDarkMode"
                    @toggle="toggleDarkMode"
                  ></Toggle>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-white dark:bg-gray-900 text-right sm:px-6">
        <Button
          type="submit"
          class="
            bg-gray-800
            border border-transparent
            rounded-md
            shadow-sm
            py-2
            px-4
            inline-flex
            justify-center
            text-sm
            font-medium
            text-white
            hover:bg-gray-900
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-900
          "
        >
          Save
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import Toggle from '@/components/common/Toggle'
import Button from '@/components/common/Button'

export default {
  components: { Button, Toggle },
  middleware: 'magicauth',
  data() {
    return {}
  },
  computed: {
    enableDarkMode() {
      return this.$store.getters['preferences/darkmodeOrDefault'](
        this.$colorMode.value === 'dark'
      )
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('user/logout')
    },

    toggleDarkMode(darkMode) {
      this.$store.commit('preferences/setDarkMode', darkMode)
      this.$colorMode.preference = darkMode ? 'dark' : 'light'
    },
  },
}
</script>