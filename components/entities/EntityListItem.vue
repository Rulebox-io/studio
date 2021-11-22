<template>
  <a href="#" class="group block hover:bg-gray-50 dark:hover:bg-gray-800">
    <div class="px-4 py-4 sm:px-6">
      <div class="flex items-center justify-between">
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
          {{ display }}
          <Badge
            class="
              ml-2
              bg-transparent
              text-blue-500
              border-solid border-2 border-blue-500
            "
            >{{ revision }}</Badge
          >
        </p>
        <div class="ml-2 flex-shrink-0 flex">
          <Badge class="bg-green-100 text-green-800">{{ status }}</Badge>
        </div>
      </div>
      <div class="mt-2 sm:flex sm:justify-between">
        <div class="sm:flex">
          <p
            class="
              flex
              items-center
              text-sm text-gray-500
              group-hover:text-gray-700
              dark:group-hover:text-gray-300
            "
          >
            <span class="font-mono">{{ tag }}</span>
          </p>
        </div>
        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
          <p>
            Last modified on
            <time :datetime="lastModified">{{ lastModified }}</time
            ><!-- hard coded -->
          </p>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
import Badge from '@/components/common/Badge'

export default {
  components: { Badge },
  props: { entity: { type: Object, required: true } },
  computed: {
    display() {
      return this.entity && this.entity.name
    },
    tag() {
      return this.entity && this.entity.tag
    },
    revision() {
      if (!this.entity || !this.entity.revision) return
      return `Rev ${this.entity.revision.revision}`
    },
    status() {
      if (!this.entity || !this.entity.revision) return
      return this.entity.revision.status
    },
    lastModified() {
      if (!this.entity || !this.entity.revision) return
      return this.entity.revision.last_modified_on
    },
  },
}
</script>