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
const rows = [
  {
    id: '0',
    values: [
      'Default key',
      '553c33c43c43c3443c43c34c343c43c23c23c',
      '12 Jun 2021',
    ],
  },
  {
    id: '1',
    values: [
      'Default key',
      'ab43b4ab535ba23ab32ba32ba3b2a32b4ab4b',
      '12 Jun 2021',
    ],
  },
  {
    id: '2',
    values: [
      'Default key',
      '8d78d78d86d56d56d45d45d45d45d56d67d11',
      '12 Jun 2021',
    ],
  },
]
export default {
  components: { Table },
  data() {
    return {
      headers,
      rows,
    }
  },
}
</script>

<style lang="postcss" scoped>
</style>
