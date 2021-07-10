<template>
  <a href="#" class="group block hover:bg-gray-50 dark:hover:bg-gray-800">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="min-w-0 flex-1 flex items-center">
        <Avatar
          class="flex-shrink-0 avatar-lg"
          :url="user.picture"
          :name="user.name"
        ></Avatar>
        <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <p
              class="
                text-sm
                font-medium
                text-gray-700
                group-hover:text-gray-900
                dark:text-gray-300
                dark:group-hover:text-gray-100
                truncate
              "
            >
              {{ user.name }}
            </p>
            <p
              class="
                mt-2
                flex
                items-center
                text-sm text-gray-500
                group-hover:text-gray-700
                dark:group-hover:text-gray-300
              "
            >
              <span class="truncate">{{ user.email }}</span>
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
<script>
import ChevronRightIcon from '@/components/heroIcons/solid/ChevronRight'
import Avatar from '../common/Avatar.vue'
export default {
  components: { Avatar, ChevronRightIcon },
  props: { user: { type: Object, required: true } },
  computed: {
    roles() {
      if (
        // eslint-disable-next-line eqeqeq
        undefined == this.user ||
        // eslint-disable-next-line eqeqeq
        undefined == this.user.roles ||
        !Array.isArray(this.user.roles)
      )
        return

      return this.user.roles.join(', ')
    },
  },
}
</script>