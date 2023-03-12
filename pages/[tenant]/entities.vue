<script setup>
  import {AdjustmentsVerticalIcon, TrashIcon} from "@heroicons/vue/20/solid"
  import {CubeIcon, XMarkIcon} from "@heroicons/vue/24/outline"
  const route = useRoute()
  const config = useRuntimeConfig()

  const tenant = route.params.tenant

  const {pending, data: entities} = useLazyAsyncData("entities", async () => {
    const {data} = await useFetch(
      `${config.public.studioApiUrl}/entity?tenant=${tenant}`
    )

    if (!data.value) {
      return {}
    }

    if (data.value.status !== "success" || !Array.isArray(data.value.data)) {
      return {}
    }

    return data.value.data.map((e) => ({
      id: e.id,
      name: e.name,
      tag: e.tag,
      labels: [...e.labels],
      latest: {...e.latest},
      head: {...e.head},
    }))
  })

  const isEditingNewEntity = ref(false)
  const isEditingNewEntityDesktop = ref(false)

  const count = computed(() => {
    if (pending.value) return ""
    return `${entities.value.length} type${
      entities.value.length === 1 ? "" : "s"
    }`
  })

  const selectedCount = computed(() => {
    if (pending.value) return 0
    console.log(entities.value)
    return entities.value.filter((e) => e.selected).length
  })

  const selectedDisplay = computed(() => {
    if (selectedCount.value === 0) return ""
    return `${selectedCount.value} type${
      selectedCount.value === 1 ? "" : "s"
    } selected`
  })

  const editNewEntity = (mode) => {
    switch (mode) {
      case "desktop":
        isEditingNewEntityDesktop.value = true
        break
      case "mobile":
        isEditingNewEntity.value = true
        break
    }
  }

  const toggleSelect = (id) => {
    const match = entities.value.find((e) => e.id === id)
    if (match) {
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
  <div class="flex min-h-screen flex-col">
    <AppScreenHeader>
      <CubeIcon class="h-6 w-6"></CubeIcon>
      <span>Types</span>
    </AppScreenHeader>
    <div
      class="px-4 py-4 md:px-6"
      :class="isEditingNewEntity ? 'hidden md:block' : 'block'">
      <h1
        class="flex items-center justify-between font-medium text-gray-900 dark:text-gray-100">
        <div class="flex items-center md:space-x-10">
          <span
            class="hidden text-2xl text-gray-600 dark:text-gray-400 md:block"
            >{{ tenant }}</span
          >
          <span class="hidden text-2xl md:block">Types</span>
          <div class="flex items-center space-x-4">
            <CommonIconButton :disabled="false"
              ><AdjustmentsVerticalIcon
                class="h-5 w-5"></AdjustmentsVerticalIcon
            ></CommonIconButton>
            <span>{{ count }}</span>
          </div>
        </div>
        <CommonButton class="hidden md:block" @click="editNewEntity('desktop')">
          New type
        </CommonButton>
        <CommonButton class="md:hidden" @click="editNewEntity('mobile')">
          New type
        </CommonButton>
      </h1>
    </div>
    <div
      v-if="!pending"
      class="mt-12 px-4 md:px-6"
      :class="isEditingNewEntity ? 'hidden md:block' : 'block'">
      <EntitiesEntityList
        :entities="entities"
        @toggle="toggleSelect"></EntitiesEntityList>
    </div>
    <div
      v-if="selectedCount"
      class="absolute inset-x-4 bottom-0 mx-auto flex max-w-6xl items-center justify-between rounded-t-lg border-0 border-desaturated-200 bg-gray-50 px-6 py-4 dark:inset-x-0 dark:rounded-none dark:border-t dark:border-desaturated-700 dark:bg-desaturated-900 md:inset-x-0 md:bottom-8 md:rounded-md md:border md:shadow-md">
      <span class="text-base font-medium text-gray-900 dark:text-white">{{
        selectedDisplay
      }}</span>
      <div class="flex items-center space-x-4">
        <CommonButton
          class="hidden md:block"
          variant="secondary"
          @click="cancelSelection"
          >Cancel</CommonButton
        >
        <CommonButton @click="deleteSelection">
          <TrashIcon class="h-5 w-5"></TrashIcon>
          <span class="hidden md:inline">Delete</span>
        </CommonButton>
      </div>
    </div>

    <div
      v-if="isEditingNewEntity"
      class="mt-12 flex flex-grow flex-col px-4 md:hidden">
      <EntityEditor
        class="flex-grow"
        display=""
        description=""
        :tag="null"
        :labels="[]"
        @close="isEditingNewEntity = false">
      </EntityEditor>
    </div>
    <Dialog
      :open="isEditingNewEntityDesktop"
      class="relative z-50 bg-transparent"
      @close="isEditingNewEntityDesktop = false">
      <div
        class="fixed inset-0 flex items-center justify-center bg-[rgba(12,12,14,0.3)] backdrop-blur-md transition-all dark:bg-transparent">
        <DialogPanel
          class="w-[640px] rounded-md border border-desaturated-200 bg-desaturated-100 p-6 text-gray-900 shadow-lg dark:border-desaturated-700 dark:bg-desaturated-900 dark:text-white">
          <DialogTitle>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <CubeIcon class="h-6 w-6"></CubeIcon>
                <span class="text-xl font-medium">New type</span>
              </div>
              <button
                class="flex h-lesserbutton w-[33px] items-center justify-center rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:hover:bg-desaturated-800 dark:focus:ring-rulebox-200"
                @click="isEditingNewEntityDesktop = false">
                <XMarkIcon class="h-9 w-9"></XMarkIcon>
              </button>
            </div>
          </DialogTitle>
          <EntityEditor
            class="mt-10"
            display=""
            description=""
            :tag="null"
            :labels="[]"
            @close="isEditingNewEntityDesktop = false">
          </EntityEditor>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>
