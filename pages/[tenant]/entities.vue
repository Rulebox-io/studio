<script setup>
  import { AdjustmentsVerticalIcon, TrashIcon } from '@heroicons/vue/20/solid';
  import { CubeIcon } from '@heroicons/vue/24/outline';
  const route = useRoute()
  const config = useRuntimeConfig()

  const tenant = route.params.tenant

  const {pending, data: entities} = useLazyFetch(
    `${config.public.studioApiUrl}/entity?tenant=${tenant}`
  )

  const count = computed(() => {
    if(pending.value) return ''
    return `${entities.value.length} type${entities.value.length === 1 ? '' : 's'}`
  })

  const selectedCount = computed(() => {
    if(pending.value) return 0
    return entities.value.filter((e) => e.selected).length
  })

  const selectedDisplay = computed(() => {
    if(selectedCount.value===0) return ''
    return `${selectedCount.value} type${selectedCount.value===1 ? '' : 's'} selected`
  })

  const newEntity = () => {
    // eslint-disable-next-line no-alert
    alert("New entity")
  }

  const toggleSelect = (id) => {
    const match = entities.value.find((e) => e.id === id)
    if(match) {
      match.selected = !match.selected
    }
  }
  
  const cancelSelection = () => {
    entities.value.forEach((e) => {
      e.selected = false
    })
  }

  const deleteSelection = () => {
    // eslint-disable-next-line no-alert
    alert("Delete")
  }
</script>

<template>
  <div>
    <AppScreenHeader>
        <CubeIcon class="w-6 h-6"></CubeIcon>
        <span>Types</span>
    </AppScreenHeader>
    <div class="px-4 md:px-6 py-4">
      <h1
        class="flex items-center justify-between font-medium text-gray-900 dark:text-gray-100">
        <div class="flex items-center md:space-x-10">
          <span class="hidden md:block text-2xl text-gray-600 dark:text-gray-400">{{ tenant }}</span>
          <span class="hidden md:block text-2xl">Types</span>
          <div class="flex items-center space-x-4">
            <CommonIconButton :disabled="false"><AdjustmentsVerticalIcon class="w-5 h-5"></AdjustmentsVerticalIcon></CommonIconButton>
            <span>{{ count }}</span>          
          </div>
        </div>
        <CommonButton @click="newEntity"
          >New type</CommonButton
        >
      </h1>
    </div>
    <div v-if="!pending" class="mt-12 px-4 md:px-6">
      <EntitiesEntityList :entities="entities" @toggle="toggleSelect"></EntitiesEntityList>
    </div>
    <div v-if="selectedCount" class="absolute mx-auto inset-x-4 dark:inset-x-0 md:inset-x-0 bottom-0 md:bottom-8 max-w-6xl flex items-center justify-between px-6 py-4 rounded-t-lg dark:rounded-none md:rounded-md md:shadow-md bg-gray-50  border-0 dark:border-t md:border border-desaturated-200 dark:bg-desaturated-900 dark:border-desaturated-700">
      <span class="text-gray-900 dark:text-white text-base font-medium">{{ selectedDisplay }}</span>
      <div class="flex items-center space-x-4">
        <CommonButton class="hidden md:block" @click="cancelSelection" variant="secondary">Cancel</CommonButton>
        <CommonButton @click="deleteSelection">
          <TrashIcon class="w-5 h-5"></TrashIcon>
          <span class="hidden md:inline">Delete</span>
        </CommonButton>
      </div>
    </div>
  </div>
</template>
