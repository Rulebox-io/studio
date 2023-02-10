<script setup>
  import { AdjustmentsVerticalIcon } from '@heroicons/vue/20/solid';
  import { CubeIcon } from '@heroicons/vue/24/outline';
  const route = useRoute()
  const config = useRuntimeConfig()

  const {pending, data: entities} = useLazyFetch(
    `${config.public.studioApiUrl}/entity?tenant=${route.params.tenant}`
  )

  const newEntity = () => {
    // eslint-disable-next-line no-alert
    alert("New entity")
  }
</script>

<template>
  <div>
    <AppScreenHeader>
        <CubeIcon class="w-6 h-6"></CubeIcon>
        <span>Types</span>
    </AppScreenHeader>
    <div class="px-6 py-4">
      <h1
        class="flex items-center justify-between font-medium text-gray-900 dark:text-gray-100">
        <div class="flex items-center md:space-x-10">
          <span class="hidden md:block text-2xl text-gray-600 dark:text-gray-400">Acme Corp</span>
          <span class="hidden md:block text-2xl">Types</span>
          <div class="flex items-center space-x-4">
            <CommonIconButton :disabled="false"><AdjustmentsVerticalIcon class="w-5 h-5"></AdjustmentsVerticalIcon></CommonIconButton>
            <span>2 types</span>          
          </div>
        </div>
        <CommonButton @click="newEntity"
          >New type</CommonButton
        >
      </h1>
    </div>
    <div v-if="!pending" class="mt-12 px-6">
      <EntitiesEntityList :entities="entities"></EntitiesEntityList>
    </div>
  </div>
</template>
