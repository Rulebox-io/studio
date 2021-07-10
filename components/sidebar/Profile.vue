<template>
  <a href="#" class="flex-shrink-0 md:w-full group block">
    <div class="flex items-center">
      <Avatar :url="url" :name="name"> </Avatar>
      <div class="ml-3">
        <p
          class="
            text-base
            md:text-sm
            font-medium
            text-gray-700
            group-hover:text-gray-900
            dark:text-gray-300
            dark:group-hover:text-gray-100
          "
        >
          {{ name }}
        </p>
        <p
          class="
            text-sm
            md:text-xs
            font-medium
            text-gray-500
            group-hover:text-gray-700
            dark:group-hover:text-gray-300
          "
        >
          View profile
        </p>
      </div>
    </div>
  </a>
</template>
<script>
import Avatar from '@/components/common/Avatar'

export default {
  components: { Avatar },
  props: {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
}
</script>