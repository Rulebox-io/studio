<template>
  <div class="flex items-center justify-between my-2">
    <p
      class="
        text-sm
        font-medium
        text-gray-700
        group-hover:text-gray-900
        dark:text-gray-300 dark:group-hover:text-gray-100
        truncate
      "
    >
      <CubeIcon class="inline-block h-5 w-5"></CubeIcon>

      {{ name }}
      <Badge
        class="
          ml-2
          bg-transparent
          text-blue-500
          border-solid border-2 border-blue-500
        "
        >{{ rev }}</Badge
      >
    </p>
    <div class="ml-2 flex-shrink-0 flex items-center dark:text-white">
      <time class="text-sm mr-1.5" :datetime="lastModified">{{
        lastModified
      }}</time>
      <StatusLabel :status="status"></StatusLabel>
    </div>
  </div>
</template>
<script>
import Badge from '@/components/common/Badge'
import CubeIcon from '@/components/heroIcons/outline/CubeIcon'
import StatusLabel from './StatusLabel.vue'

export default {
  components: { Badge, CubeIcon, StatusLabel },
  props: {
    entity: { type: Object, required: true },
    revision: { type: Object, required: true },
  },
  computed: {
    name() {
      return this.entity.name
    },
    rev() {
      return `Rev ${this.revision.revision}`
    },

    status() {
      return this.revision.status
    },
    lastModified() {
      return this.revision.last_modified_on
    },
  },
}
</script>