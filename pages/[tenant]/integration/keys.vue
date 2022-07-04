<script setup>
  const route = useRoute()
  const config = useRuntimeConfig()

  const headers = ref([
    {id: "name", display: "Name"},
    {id: "primary", display: "Primary"},
    {id: "secondary", display: "Secondary"},
    {id: "issued-on", display: "Issued on"},
  ])
  const isCreatingKey = ref(false)
  const keyName = ref("")

  const {pending, data: rows} = useLazyAsyncData("rows", async () => {
    const {data} = await useFetch(
      `${config.public.studioApiUrl}/keys?tenant=${route.params.tenant}`
    )

    if (!data.value) {
      return []
    }

    return data.value.map((elt, n) => ({
      id: n,
      values: [elt.name, elt.primary, elt.secondary, elt.issued_on],
    }))
  })

  const isKeyEmpty = computed(() => {
    return !keyName || keyName.length === 0
  })

  const cancelCreateKey = () => {
    isCreatingKey.value = false
  }

  const openCreateKey = () => {
    isCreatingKey.value = true
  }

  const createKey = async () => {
    if (isKeyEmpty.value) {
      return
    }

    isCreatingKey.value = false

    try {
      const {$axios} = this.$nuxt.context
      const {data} = await $axios.post(
        `${process.env.studioApiUrl}/keys?tenant=${this.$route.params.tenant}&name=${this.keyName}` // URL-encode
      )

      if (data) {
        rows.push({
          id: 999,
          values: [data.name, data.primary, data.secondary, data.issued_on],
        })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("ERR")
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
</script>

<template>
  <div>
    <div class="my-4 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1
        class="flex items-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
        API Keys
        <CommonButton class="ml-auto" @click="openCreateKey"
          >Create key</CommonButton
        >
      </h1>
    </div>
    <div v-if="!pending" class="mx-auto my-4 max-w-7xl px-4 sm:px-6 md:px-8">
      <CommonTable :headers="headers" :rows="rows"></CommonTable>
    </div>

    <CommonDialog :open="isCreatingKey">
      <div>
        <h3
          id="modal-title"
          class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
          Create key
        </h3>
        <div class="mt-2">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Key Name
              </label>
              <div class="mt-1">
                <input
                  v-model="keyName"
                  placeholder="Enter a key name"
                  required
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:border-rulebox-500 focus:outline-none focus:ring-2 focus:ring-rulebox-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500 sm:text-sm" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <CommonButton
          :disabled="isKeyEmpty"
          class="w-full justify-center sm:col-start-2"
          @click="createKey"
          >OK</CommonButton
        >
        <CommonButton
          :secondary="true"
          class="mt-3 w-full justify-center sm:col-start-1 sm:mt-0"
          @click="cancelCreateKey"
          >Cancel</CommonButton
        >
      </div>
    </CommonDialog>
  </div>
</template>

<style lang="postcss" scoped></style>
