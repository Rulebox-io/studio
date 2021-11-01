<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="bg-white py-6 px-4 sm:p-6 dark:bg-gray-900">
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
                  py-4
                  sm:py-5
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
      <div class="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-right sm:px-6">
        <button
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
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Toggle from '@/components/common/Toggle'
export default {
  components: { Toggle },
  middleware: 'magicauth',
  data() {
    return {
      enableDarkMode: this.$colorMode.value === 'dark',
    }
  },
  methods: {
    toggleDarkMode(darkMode) {
      this.enableDarkMode = darkMode
      this.$colorMode.preference = darkMode ? 'dark' : 'light'
    },
  },
}
</script>