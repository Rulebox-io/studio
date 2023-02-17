<script setup>
  import { AdjustmentsVerticalIcon, TrashIcon } from '@heroicons/vue/20/solid';
  import { CubeIcon, XMarkIcon } from '@heroicons/vue/24/outline';
  const route = useRoute()
  const config = useRuntimeConfig()

  const tenant = route.params.tenant

  const {pending, data: entities} = useLazyAsyncData(
    "entities",
    async () => {
      const {data} = await useFetch(
        `${config.public.studioApiUrl}/entity?tenant=${tenant}`
      )

      if (!data.value) {
        return {}
      }

      if(data.value.status!=='success' || !Array.isArray(data.value.data)) {
        return { }
      }

      return data.value.data.map(e => (
        {
          id: e.id,
          name: e.name,
          tag: e.tag,
          labels: [...e.labels],
          latest: { ...e.latest },
          head: { ...e.head },
        }))
    }
  )

  const isEditingNewEntity = ref(false)
  const isEditingNewEntityDesktop = ref(false)

  const count = computed(() => {
    if(pending.value) return ''
    return `${entities.value.length} type${entities.value.length === 1 ? '' : 's'}`
  })

  const selectedCount = computed(() => {
    if(pending.value) return 0
    console.log(entities.value)
    return entities.value.filter((e) => e.selected).length
  })

  const selectedDisplay = computed(() => {
    if(selectedCount.value===0) return ''
    return `${selectedCount.value} type${selectedCount.value===1 ? '' : 's'} selected`
  })

  const editNewEntity = (mode) => {
    switch(mode) {
      case 'desktop':
        isEditingNewEntityDesktop.value = true
        break
      case 'mobile':
        isEditingNewEntity.value = true
        break
    }    
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
  <div class="min-h-screen flex flex-col">
    <AppScreenHeader>
        <CubeIcon class="w-6 h-6"></CubeIcon>
        <span>Types</span>
    </AppScreenHeader>
    <div class="px-4 md:px-6 py-4"
    :class="isEditingNewEntity ? 'hidden md:block' : 'block'">

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
        <CommonButton @click="editNewEntity('desktop')" class="hidden md:block">
          New type
        </CommonButton>
        <CommonButton @click="editNewEntity('mobile')" class="md:hidden">
          New type
        </CommonButton>
      </h1>
    </div>
    <div v-if="!pending" class="mt-12 px-4 md:px-6"
      :class="isEditingNewEntity ? 'hidden md:block' : 'block'">    
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

    <div v-if="isEditingNewEntity" class="mt-12 px-4 flex flex-col flex-grow md:hidden">
      <EntityEditor 
        class="flex-grow"
        @close="isEditingNewEntity = false"
        display="" 
        description="" 
        :tag="null" 
        :labels="[]">
      </EntityEditor>
    </div> 
    <Dialog 
      :open="isEditingNewEntityDesktop" 
      @close="isEditingNewEntityDesktop = false"
      class="relative z-50 bg-transparent">
      <div class="fixed inset-0 flex items-center justify-center transition-all bg-[rgba(12,12,14,0.3)] dark:bg-transparent">
        <DialogPanel class="rounded-md border shadow-lg w-[640px] p-6 text-gray-900 bg-desaturated-100 border-desaturated-200 dark:text-white dark:bg-desaturated-900 dark:border-desaturated-700">
          <DialogTitle>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <CubeIcon class="w-6 h-6"></CubeIcon>
                <span class="font-medium text-xl">New type</span>
              </div>
              <button
                  @click="isEditingNewEntityDesktop = false"
                  class="flex items-center justify-center rounded-md w-[33px] h-lesserbutton focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-rulebox-500 hover:bg-gray-50  dark:hover:bg-desaturated-800 dark:focus:ring-rulebox-200">
                  <XMarkIcon class="w-9 h-9"></XMarkIcon>
              </button>
            </div>
          </DialogTitle>
          <EntityEditor 
            class="mt-10"
            @close="isEditingNewEntityDesktop = false"
            display="" 
            description="" 
            :tag="null" 
            :labels="[]">
          </EntityEditor>
        </DialogPanel>
      </div>
    </Dialog>    
  </div>
</template>
