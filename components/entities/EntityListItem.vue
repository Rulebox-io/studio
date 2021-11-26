<template>
  <NuxtLink
    :to="link"
    class="group block hover:bg-gray-50 dark:hover:bg-gray-800"
  >
    <div class="px-4 py-4 sm:px-6">
      <EntityRevision :entity="entity" :revision="latest"></EntityRevision>
      <EntityRevision
        v-if="hasRecentDraft"
        :entity="entity"
        :revision="head"
      ></EntityRevision>

      <div class="mt-2 sm:flex sm:justify-between">
        <div class="flex items-center">
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
          <Badge
            v-for="label in entity.labels"
            :key="label"
            class="
              ml-2
              border border-gray-300
              bg-white
              text-gray-700
              dark:border-transparent dark:bg-gray-600 dark:text-white
            "
          >
            {{ label }}
          </Badge>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script>
import Badge from '@/components/common/Badge'
import EntityRevision from './EntityRevision.vue'

export default {
  components: { Badge, EntityRevision },
  props: { entity: { type: Object, required: true } },
  computed: {
    hasRecentDraft() {
      if (!this.entity.latest || !this.entity.head) return

      return this.entity.latest.revision !== this.entity.head.revision
    },
    link() {
      if (!this.entity.head) return
      return `/${this.$route.params.tenant}/entity/${this.entity.tag}/${this.entity.head.revision}`
    },
    tag() {
      return this.entity.tag
    },
    latest() {
      return this.entity.latest
    },
    head() {
      return this.entity.head
    },
  },
}
</script>