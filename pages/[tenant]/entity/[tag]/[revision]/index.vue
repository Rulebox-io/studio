<script setup>
  import { CubeIcon, XMarkIcon } from "@heroicons/vue/24/outline"
  import { TableCellsIcon, CodeBracketSquareIcon } from "@heroicons/vue/20/solid"

  import {useStore} from "@/store/entity"
  import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

  const route = useRoute()
  const config = useRuntimeConfig()
  const store = useStore()

  const tenant = route.params.tenant
  const isEditing = ref(false)
  const definitionEditor = ref()

  const {pending, data: working_set} = useLazyAsyncData(
    "revision",
    async () => {
      const {data} = await useFetch(
        `${config.public.studioApiUrl}/entityrevision?tenant=${route.params.tenant}&tag=${route.params.tag}&revision=${route.params.revision}`
      )

      if (!data.value) {
        return {}
      }

      if(data.value.status!=='success' || !data.value.data) {
        return { }
      }

      return {
        id: data.value.data.id,
        display: data.value.data.name,
        tag: data.value.data.tag,
        labels: [...data.value.data.labels],
        revision_id: data.value.data.revision.id,
        revision: data.value.data.revision.revision,
        definition: data.value.data.revision.definition,
        status: data.value.data.revision.status,
        ts: data.value.data.revision.ts,
      }
    }
  )

  const name = computed(() => {
    return "Edwin Groenendaal"
  })

  const revisions = [
    {
      revision: 1,
      status: "draft",
      date: new Date("2022-11-09"),
      name: "John Doe",
      url: null,
    },
    {
      revision: 2,
      status: "published",
      date: new Date("2022-11-09"),
      name: "John Doe",
      url: null,
    },
  ]

  const dependencies = [
    {
      name: "Invoice",
      revision: 6,
      status: 'draft',
      rulesets: [
        {
          name: "Has invoice expired",
          revision: 4,
          status: 'draft',
        },
      ]
    },
    {
      name: "Invoice",
      revision: 5,
      status: 'published',
      rulesets: [
        {
          name: "Has invoice expired",
          revision: 2,
          status: 'published',
        },
        {
          name: "Has invoice expired",
          revision: 1,
          status: 'published',
        },
      ]
    },
  ]

  const selectedEditor = ref('left')
  const isEditingSummary = ref(false)
  const isEditingSummaryDesktop = ref(false)

  
  const selectEditor = (editor) => {
    
    selectedEditor.value = editor
  }

  const editSummary = (mode) => {
    switch(mode) {
      case 'desktop':
        isEditingSummaryDesktop.value = true
        break
      case 'mobile':
        isEditingSummary.value = true
        break
    }
  }

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
  <div class="min-h-screen flex flex-col">
    <AppScreenHeader v-if="!pending">
        <CubeIcon class="w-6 h-6"></CubeIcon>
        <span>{{working_set.display}}</span>
    </AppScreenHeader>

    <div v-if="!pending" class="px-4 md:px-6 py-4 hidden md:block">
      <h1
        class="flex items-center justify-between font-medium text-gray-900 dark:text-gray-100">
        <div class="flex items-center md:space-x-10">
          <span class="text-2xl text-gray-600 dark:text-gray-400">{{ tenant }}</span>
          <span class="text-2xl flex items-center space-x-4">
            <CubeIcon class="w-6 h-6"></CubeIcon>
            <span>{{ working_set.display }}</span>
          </span>
        </div>
      </h1>
    </div>

    <div v-if="!pending" class="mt-12 flex-col md:flex-row flex-grow"
      :class="isEditingSummary ? 'hidden md:flex' : 'flex'">
      <div class="px-4 md:px-6 md:w-[390px] flex flex-col space-y-6">
        <AppRevisionInfo 
          :revision="working_set.revision" 
          :status="working_set.status"
          :date="new Date('2022-11-09')"
          name="John Doe"
          :url="null">
        </AppRevisionInfo>
        <AppSummary
          :display="working_set.display"
          description="Some description that needs to be loaded from the server"
          :tag="working_set.tag"
          :labels="working_set.labels"
          @click="editSummary">
        </AppSummary>
        <CommonDisclosure>
          <template #title>Revisions</template>
          <AppRevisionHistory :revisions="revisions"></AppRevisionHistory>
        </CommonDisclosure>
        <CommonDisclosure>
          <template #title>Rulesets that use this type</template>
          <div class="space-y-4">
            <AppEntityDependency 
              v-for="dependency in dependencies" 
              :key="dependency.id" 
              :name="dependency.name" 
              :revision="dependency.revision" 
              :status="dependency.status" 
              :rulesets="dependency.rulesets">
            </AppEntityDependency>
          </div>
        </CommonDisclosure>
      </div>
      <div class="mt-6 md:mt-0 px-4 md:pr-6 flex-grow flex flex-col space-y-6">
        <div class="flex items-center justify-between pl-4 md:pl-0 text-lg font-bold text-gray-900 dark:text-white">
          <span>Type definition</span>
          <CommonToggle :selected="selectedEditor" @select="selectEditor">
            <template #left><TableCellsIcon class="w-5 h-5"></TableCellsIcon></template>
            <template #right><CodeBracketSquareIcon class="w-5 h-5"></CodeBracketSquareIcon></template>
          </CommonToggle>
        </div>
        <pre
            ref="definitionEditor"
            :contenteditable="isEditing"
            class="min-h-[400px] flex-grow mt-4 rounded-md p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-desaturated-800 "
            >{{ working_set.definition }}
        </pre>
        <div class="flex items-center space-x-4 justify-end pb-4">
          <CommonButton @click="abandonChanges" variant="secondary">Cancel</CommonButton>
          <CommonButton @click="saveDraft" class="flex-grow md:flex-grow-0">
            <span>Save Draft</span>
          </CommonButton>
        </div>
      </div>     
    </div>
    <div v-if="isEditingSummary" class="mt-12 px-4 flex flex-col flex-grow md:hidden">
      <EntityEditor 
        class="flex-grow"
        @close="isEditingSummary = false"
        :display="working_set.display" 
        description="Some description that needs to be loaded from the server" 
        :tag="working_set.tag" 
        :labels="working_set.labels">
      </EntityEditor>
    </div> 
    <Dialog 
      :open="isEditingSummaryDesktop" 
      @close="isEditingSummaryDesktop = false"
      class="relative z-50 ">
      <div class="fixed inset-0 flex items-center justify-center bg-[rgba(12,12,14,0.3)] dark:bg-transparent backdrop-blur-md">
        <DialogPanel class="rounded-md border shadow-lg w-[640px] p-6 text-gray-900 bg-desaturated-100 border-desaturated-200 dark:text-white dark:bg-desaturated-900 dark:border-desaturated-700">
          <DialogTitle>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <CubeIcon class="w-6 h-6"></CubeIcon>
                <span class="font-medium text-xl">{{ working_set.display }}</span>
              </div>
              <button
                  @click="isEditingSummaryDesktop = false"
                  class="flex items-center justify-center rounded-md w-[33px] h-lesserbutton focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-rulebox-500 hover:bg-gray-50  dark:hover:bg-desaturated-800 dark:focus:ring-rulebox-200">
                  <XMarkIcon class="w-9 h-9"></XMarkIcon>
              </button>
            </div>
          </DialogTitle>
          <EntityEditor 
            class="mt-10"
            @close="isEditingSummaryDesktop = false"
            :display="working_set.display" 
            description="Some description that needs to be loaded from the server" 
            :tag="working_set.tag" 
            :labels="working_set.labels">
          </EntityEditor>
        </DialogPanel>
      </div>
    </Dialog>
    <!--
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
                  <CloudArrowUpIcon class="mr-3 h-5 w-5"></CloudArrowUpIcon>
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
  -->
  </div>
</template>
