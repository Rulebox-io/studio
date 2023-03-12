<script setup>
  import {CubeIcon} from "@heroicons/vue/24/outline"

  const myProps = defineProps({
    entity: {type: Object, required: true},
  })

  const emit = defineEmits(["toggle"])

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

  const revisions = [
    parseRevision(myProps.entity.head),
    parseRevision(myProps.entity.latest),
  ]

  function toggle() {
    emit("toggle", myProps.entity.id)
  }

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
    class="flex flex-col space-y-[23px] rounded-md border border-desaturated-200 bg-gray-50 p-4 transition-shadow hover:shadow-md dark:border-desaturated-800 dark:bg-desaturated-800 md:w-[321px]">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <CubeIcon class="h-5 w-5 text-gray-900 dark:text-white"></CubeIcon>
        <span class="font-medium text-gray-900 dark:text-white">
          {{ entity.name }}
        </span>
      </div>
      <button
        class="block h-6 w-6 rounded-full border"
        :class="
          entity.selected
            ? 'border-rulebox-500 bg-rulebox-500 dark:border-white dark:bg-white'
            : 'border-desaturated-500 bg-gray-50 hover:bg-desaturated-100 dark:border-gray-200 dark:bg-desaturated-900 hover:dark:bg-desaturated-800'
        "
        @click.prevent="toggle"></button>
    </div>
    <div class="text-base font-medium text-gray-700 dark:text-gray-200">
      An invoice object represents a single invoice, with multiple line...
      {{ entity.description }}
    </div>
    <div v-if="entity.labels.length > 0" class="flex items-center space-x-2">
      <AppLabel
        v-for="label in entity.labels"
        :key="label"
        label-color="#6AFFE4"
        >{{ label }}</AppLabel
      >
    </div>

    <AppRevisionHistory :revisions="revisions"></AppRevisionHistory>
  </NuxtLink>
</template>
