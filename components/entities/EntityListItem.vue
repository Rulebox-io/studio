<script setup>
  import { CubeIcon } from '@heroicons/vue/24/outline'

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

  const revisions = [ parseRevision(myProps.entity.head), parseRevision(myProps.entity.latest) ]

  function parseRevision(revision) {
    console.log(revision)
    if (!revision) {
      return
    }
    return {
      revision: revision.revision,
      date: new Date(revision.last_modified_on),
      status: revision.status,
      name: revision.edited_by,
    }
  }
</script>

<template>
  <NuxtLink
    :to="link"
    class="flex flex-col w-[321px] space-y-[23px] bg-gray-50 shadow-md border rounded-md p-4 border-desaturated-200 dark:bg-desaturated-800  dark:border-desaturated-800">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <CubeIcon class="w-5 h-5 text-gray-900 dark:text-white"></CubeIcon>
        <span class="text-gray-900 font-medium dark:text-white">
          {{ entity.name }}
        </span>
      </div>
      <div class="block w-[16px] h-[16px] rounded-full border bg-rulebox-500 border-rulebox-500 dark:bg-white dark:border-white"></div>
    </div>
    <div class="text-base font-medium text-gray-700 dark:text-gray-200">
      An invoice object represents a single invoice, with multiple line...
      {{ entity.description }}
    </div>
    <div v-if="entity.labels.length > 0" class="flex items-center space-x-2">
      <AppLabel
      v-for="label in entity.labels"
      :key="label"
      labelColor="#6AFFE4">{{ label }}</AppLabel>
    </div>

    <AppRevisionHistory :revisions="revisions"></AppRevisionHistory>
  </NuxtLink>
</template>
