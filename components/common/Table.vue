<script setup>
  const myProps = defineProps({
    headers: {type: Array, required: true},
    rows: {type: Array, required: true},
  })
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div
          class="overflow-hidden border-b border-gray-200 shadow dark:border-gray-800 sm:rounded-lg">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.id"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                  {{ header.display }}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
              <tr v-for="row in rows" :key="row.id">
                <td
                  v-for="(value, n) in row.values"
                  :key="n"
                  class="whitespace-nowrap px-6 py-4 text-sm"
                  :class="[
                    0 === n
                      ? 'font-medium text-gray-900 dark:text-gray-200'
                      : 'text-gray-500',
                  ]">
                  {{ value }}
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-400"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
