<script setup>
  import CubeIcon from "@heroicons/vue/outline/CubeIcon"
  import ChevronRightIcon from "@heroicons/vue/solid/ChevronRightIcon"
  import PencilIcon from "@heroicons/vue/solid/PencilIcon"
  import SaveIcon from "@heroicons/vue/solid/SaveIcon"
  import TrashIcon from "@heroicons/vue/solid/TrashIcon"
  import XCircleIcon from "@heroicons/vue/solid/XCircleIcon"

  import {useStore} from "@/store/entity"

  const route = useRoute()
  const config = useRuntimeConfig()
  const store = useStore()

  const isEditing = ref(false)
  const definitionEditor = ref()
  const {pending, data: working_set} = useLazyAsyncData(
    "revision",
    async () => {
      const {data} = await useFetch(
        `${config.public.studioApiUrl}/entity?tenant=${route.params.tenant}&tag=${route.params.tag}&revision=${route.params.revision}`
      )

      if (!data.value) {
        return {}
      }
      return {
        id: data.value.id,
        display: data.value.name,
        tag: data.value.tag,
        labels: [...data.value.labels],
        revision_id: data.value.revision.id,
        revision: data.value.revision.revision,
        definition: data.value.revision.definition,
        status: data.value.revision.status,
        ts: data.value.revision.ts,
      }
    }
  )

  const name = computed(() => {
    return "Edwin Groenendaal"
  })

  const startEditing = () => {
    isEditing.value = true
    nextTick(() => definitionEditor.value.focus())
  }

  const abandonChanges = () => {
    isEditing.value = false
  }

  const deleteRevision = () => {
    store.deleteEntityRevision({
      tenant: route.params.tenant,
      id: working_set.value.revision_id,
    })
  }
  const saveDraft = () => {
    store.updateEntityRevision({
      tenant: route.params.tenant,
      id: working_set.value.revision_id,
      ts: working_set.value.ts,
      content: definitionEditor.value.textContent,
    })
  }
</script>

<template>
  <div>
    <div v-if="!pending" class="my-4 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="flex items-center text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl">
            <CubeIcon
              class="mr-1.5 h-8 w-8 flex-shrink-0 text-gray-900 dark:text-white"></CubeIcon>

            {{ working_set.display }}
            <CommonBadge
              class="ml-2 border-2 border-solid border-blue-500 bg-transparent text-blue-500"
              >Rev {{ working_set.revision }}</CommonBadge
            >
          </h2>
          <div
            class="mt-1 flex flex-row flex-wrap sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div
              class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300">
              <code>{{ working_set.tag }}</code>
            </div>
            <div class="mt-2 flex items-center text-sm">
              <CommonBadge
                v-for="label in working_set.labels"
                :key="label"
                class="ml-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-transparent dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">
                {{ label }}
              </CommonBadge>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center lg:mt-0 lg:ml-4">
          <span class="flex items-center">
            <div class="mr-3 text-sm text-gray-500 dark:text-gray-300">
              12 November 2021
            </div>
            <CommonAvatar :name="working_set.name"> </CommonAvatar>
          </span>

          <span class="ml-3">
            <EntitiesStatusLabel
              :status="working_set.status"></EntitiesStatusLabel>
          </span>
        </div>
      </div>
      <div
        class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="definition-title">
            <div
              class="bg-white px-4 py-5 shadow dark:bg-gray-900 sm:rounded-lg sm:px-6">
              <h2
                id="definition-title"
                class="flex items-center text-lg font-medium text-gray-900 dark:text-gray-100">
                Definition
                <CommonButton
                  v-if="!isEditing"
                  class="ml-auto"
                  @click="startEditing">
                  <PencilIcon class="mr-3 h-5 w-5"></PencilIcon>
                  Edit
                </CommonButton>
                <CommonButton
                  v-if="isEditing"
                  :secondary="true"
                  class="ml-auto"
                  @click="abandonChanges">
                  <XCircleIcon class="mr-3 h-5 w-5"></XCircleIcon>
                  Cancel
                </CommonButton>
                <CommonButton
                  v-if="isEditing"
                  class="ml-1.5"
                  @click="saveDraft">
                  <SaveIcon class="mr-3 h-5 w-5"></SaveIcon>
                  Save draft
                </CommonButton>
              </h2>
              <pre
                ref="definitionEditor"
                :contenteditable="isEditing"
                class="mt-4 rounded-md border border-gray-200 p-4 text-gray-800 dark:border-gray-700 dark:text-gray-100"
                >{{ working_set.definition }}
            </pre
              >
            </div>
          </section>
        </div>
        <div class="lg:col-span-1 lg:col-start-3">
          <section aria-labelledby="dependencies-title">
            <div
              class="bg-white px-4 py-5 shadow dark:bg-gray-900 sm:rounded-lg sm:px-6">
              <h2
                id="dependencies-title"
                class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Dependencies
              </h2>
              <div
                class="mt-4 flex flex-wrap items-center text-sm text-gray-800 dark:text-gray-200">
                <span
                  class="flex items-center rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-800">
                  <CubeIcon class="mr-1.5 inline-block h-5 w-5"></CubeIcon>
                  Invoice
                  <CommonBadge
                    class="ml-2 border-2 border-solid border-blue-500 bg-transparent text-blue-500"
                    >Rev 1</CommonBadge
                  >
                </span>
                <ChevronRightIcon
                  class="inline-block h-6 w-6"></ChevronRightIcon>
                <span
                  class="flex items-center rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-800">
                  Is large invoice
                  <CommonBadge
                    class="ml-2 border-2 border-solid border-blue-500 bg-transparent text-blue-500"
                    >Rev 1</CommonBadge
                  >
                </span>
              </div>
              <div
                class="mt-4 flex flex-wrap items-center text-sm text-gray-800 dark:text-gray-200">
                <span
                  class="flex items-center rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-800">
                  <CubeIcon class="mr-1.5 inline-block h-5 w-5"></CubeIcon>
                  Invoice
                  <CommonBadge
                    class="ml-2 border-2 border-solid border-blue-500 bg-transparent text-blue-500"
                    >Rev 1</CommonBadge
                  >
                </span>
                <ChevronRightIcon
                  class="inline-block h-6 w-6"></ChevronRightIcon>
                <span
                  class="flex items-center rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-800">
                  Is invoice overdue
                  <CommonBadge
                    class="ml-2 border-2 border-solid border-blue-500 bg-transparent text-blue-500"
                    >Rev 2</CommonBadge
                  >
                </span>
              </div>
            </div>
          </section>
          <section aria-labelledby="delete-revision">
            <CommonButton
              class="mt-5 w-full justify-center bg-red-600 text-white hover:bg-red-700"
              @click="deleteRevision">
              <TrashIcon class="mr-3 h-5 w-5"></TrashIcon>
              Delete revision
            </CommonButton>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>