<script setup>
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
    <div class="my-4 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1
        class="flex items-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Entities
        <CommonButton class="ml-auto" @click="newEntity"
          >Create entity</CommonButton
        >
      </h1>
    </div>
    <div v-if="!pending" class="mx-auto my-4 max-w-7xl px-4 sm:px-6 md:px-8">
      <EntitiesEntityList :entities="entities"></EntitiesEntityList>
    </div>
  </div>
</template>
