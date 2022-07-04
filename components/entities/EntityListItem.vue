<script setup>
  const myProps = defineProps({
    entity: {type: Object, required: true},
  })

  const route = useRoute()

  const hasRecentDraft = computed(() => {
    if (!myProps.entity.latest || !myProps.entity.head) {
      return
    }

    return myProps.entity.latest.revision !== myProps.entity.head.revision
  })

  const link = computed(() => {
    if (!myProps.entity.head) {
      return
    }
    return `/${route.params.tenant}/entity/${myProps.entity.tag}/${myProps.entity.head.revision}`
  })

  const tag = computed(() => {
    return myProps.entity.tag
  })

  const latest = computed(() => {
    return myProps.entity.latest
  })

  const head = computed(() => {
    return myProps.entity.head
  })
</script>

<template>
  <NuxtLink
    :to="link"
    class="group block hover:bg-gray-50 dark:hover:bg-gray-800">
    <div class="px-4 py-4 sm:px-6">
      <EntitiesEntityRevision
        :entity="entity"
        :revision="latest"></EntitiesEntityRevision>
      <EntitiesEntityRevision
        v-if="hasRecentDraft"
        :entity="entity"
        :revision="head"></EntitiesEntityRevision>

      <div class="mt-2 sm:flex sm:justify-between">
        <div class="flex items-center">
          <p
            class="flex items-center text-sm text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            <span class="font-mono">{{ tag }}</span>
          </p>
          <CommonBadge
            v-for="label in entity.labels"
            :key="label"
            class="ml-2 border border-gray-300 bg-white text-gray-700 dark:border-transparent dark:bg-gray-600 dark:text-white">
            {{ label }}
          </CommonBadge>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
