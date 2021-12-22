<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="
            shadow
            overflow-hidden
            border-b border-gray-200
            dark:border-gray-800
            sm:rounded-lg
          "
        >
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-800"
          >
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.id"
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    dark:text-white
                  "
                >
                  {{ header.display }}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="
                bg-white
                divide-y divide-gray-200
                dark:bg-gray-900
                dark:divide-gray-800
              "
            >
              <tr v-for="row in rows" :key="row.id">
                <td
                  v-for="(value, n) in row.values"
                  :key="n"
                  :class="[
                    0 == n
                      ? 'font-medium text-gray-900 dark:text-gray-200'
                      : 'text-gray-500',
                    'px-6 py-4 whitespace-nowrap text-sm',
                  ]"
                >
                  {{ value }}
                </td>
                <td
                  class="
                    px-6
                    py-4
                    whitespace-nowrap
                    text-right text-sm
                    font-medium
                  "
                >
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
<script>
export default {
  props: {
    headers: { type: Array, required: true },
    rows: { type: Array, required: true },
  },
}
</script>