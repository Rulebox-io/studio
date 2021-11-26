<template>
  <Label :class="labelStyle" class="w-20 justify-center text-sm">
    {{ display }}</Label
  >
</template>
<script>
import Label from '@/components/common/Label'

export default {
  components: { Label },
  props: {
    status: { type: String, required: true },
  },
  computed: {
    labelStyle() {
      switch (this.status) {
        case 'published':
          return 'text-green-700 border-green-700 dark:text-green-500 dark:border-green-500'
        default:
          return 'text-gray-700 border-gray-700 dark:text-gray-500 dark:border-gray-500'
      }
    },
    display() {
      switch (this.status) {
        case 'published':
          return 'Published'
        case 'draft':
          return 'Draft'
        default:
          return 'Draft'
      }
    },
  },
}
</script>