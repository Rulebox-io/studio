<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        API Keys
      </h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4">
      <Table :headers="headers" :rows="rows"></Table>
    </div>
  </div>
</template>

<script>
import Table from '@/components/common/Table'

const headers = [
  { id: 'name', display: 'Name' },
  { id: 'key', display: 'Key' },
  { id: 'issued-on', display: 'Issued on' },
]

export default {
  components: { Table },
  data() {
    return {
      headers,
      rows: [],
    }
  },
  async fetch() {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(
        `${process.env.studioApiUrl}/api/${this.$route.params.tenant}/key`
      )

      // eslint-disable-next-line eqeqeq
      if (undefined != data && Array.isArray(data)) {
        this.rows = data.map((elt, n) => ({
          id: n,
          values: [elt.name, elt.key, elt.issued_on],
        }))
      }
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
}
</script>

<style lang="postcss" scoped>
</style>
