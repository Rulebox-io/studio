<script setup>
  import {computed} from "vue"

  import { ChevronRightIcon } from "@heroicons/vue/20/solid"

  const myProps = defineProps({
    user: {type: Object, required: true},
  })

  const roles = computed(() => {
    if (
      !myProps.user ||
      !myProps.user.roles ||
      !Array.isArray(myProps.user.roles)
    ) {
      return
    }

    return myProps.user.roles.join(", ")
  })
</script>

<template>
  <a href="#" class="group block hover:bg-gray-50 dark:hover:bg-gray-800">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="flex min-w-0 flex-1 items-center">
        <CommonAvatar
          class="avatar-lg flex-shrink-0"
          :url="myProps.user.picture"
          :name="myProps.user.name"></CommonAvatar>
        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <p
              class="truncate text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-gray-100">
              {{ myProps.user.name }}
            </p>
            <p
              class="mt-2 flex items-center text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
              <span class="truncate">{{ myProps.user.email }}</span>
            </p>
          </div>
          <div class="hidden md:block">
            <div>
              <p class="text-sm text-gray-900 dark:text-gray-100">Roles</p>
              <p class="mt-2 flex items-center text-sm text-gray-500">
                {{ roles }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ChevronRightIcon class="h-6 w-6"></ChevronRightIcon>
      </div>
    </div>
  </a>
</template>
