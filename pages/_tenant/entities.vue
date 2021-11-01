<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Entities
      </h1>
    </div>
    <div
      v-if="!$fetchState.pending"
      class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4"
    >
      <EntityList :entities="entities"></EntityList>
    </div>
  </div>
</template>
<script>
import EntityList from '@/components/entities/EntityList'

export default {
  components: { EntityList },
  middleware: 'magicauth',
  data() {
    return {
      entities: [],
    }
  },
  async fetch() {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(
        `${process.env.studioApiUrl}/api/${this.$route.params.tenant}/entity`
      )
      this.entities = data
      console.log(data)
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
}
</script>