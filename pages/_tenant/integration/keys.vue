<template>
  <div>
    <div class="max-w-7xl my-4 mx-auto px-4 sm:px-6 md:px-8">
      <h1
        class="
          flex
          items-center
          text-2xl
          font-semibold
          text-gray-900
          dark:text-gray-100
        "
      >
        API Keys
        <Button class="ml-auto" @click="openCreateKey">Create key</Button>
      </h1>
    </div>
    <div
      v-if="!$fetchState.pending"
      class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-4"
    >
      <Table :headers="headers" :rows="rows"></Table>
    </div>

    <Dialog :open="isCreatingKey">
      <div>
        <h3
          id="modal-title"
          class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
        >
          Create key
        </h3>
        <div class="mt-2">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label
                for="email"
                class="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                "
              >
                Email address
              </label>
              <div class="mt-1">
                <input
                  v-model="keyName"
                  placeholder="Your key's name"
                  required
                  class="
                    appearance-none
                    block
                    w-full
                    px-3
                    py-2
                    border border-gray-300
                    text-gray-700
                    dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200
                    rounded-md
                    shadow-sm
                    placeholder-gray-400
                    dark:placeholder-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:border-rulebox-500
                    focus:ring-rulebox-500
                    sm:text-sm
                  "
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        class="
          mt-5
          sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense
        "
      >
        <Button
          :disabled="isKeyEmpty"
          class="w-full justify-center sm:col-start-2"
          @click="createKey"
          >OK</Button
        >
        <Button
          :secondary="true"
          class="mt-3 w-full justify-center sm:mt-0 sm:col-start-1"
          @click="cancelCreateKey"
          >Cancel</Button
        >
      </div>
    </Dialog>
  </div>
</template>        
<script>
import Button from '@/components/common/Button'
import Dialog from '@/components/common/Dialog'
import Table from '@/components/common/Table'

const headers = [
  { id: 'name', display: 'Name' },
  { id: 'primary', display: 'Primary' },
  { id: 'secondary', display: 'Secondary' },
  { id: 'issued-on', display: 'Issued on' },
]

export default {
  components: { Button, Dialog, Table },
  data() {
    return {
      headers,
      rows: [],
      isCreatingKey: false,
      keyName: '',
    }
  },

  async fetch() {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(
        `${process.env.studioApiUrl}/keys?tenant=${this.$route.params.tenant}`
      )

      // eslint-disable-next-line eqeqeq
      if (undefined != data && Array.isArray(data)) {
        this.rows = data.map((elt, n) => ({
          id: n,
          values: [elt.name, elt.primary, elt.secondary, elt.issued_on],
        }))
      }
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },

  computed: {
    isKeyEmpty() {
      // eslint-disable-next-line eqeqeq
      return undefined == this.keyName || this.keyName.length === 0
    },
  },

  methods: {
    cancelCreateKey() {
      this.isCreatingKey = false
    },

    openCreateKey() {
      this.isCreatingKey = true
    },

    async createKey() {
      if (this.isKeyEmpty) return

      this.isCreatingKey = false

      try {
        const { $axios } = this.$nuxt.context
        const { data } = await $axios.post(
          `${process.env.studioApiUrl}/keys?tenant=${this.$route.params.tenant}&name=${this.keyName}` // URL-encode
        )

        // eslint-disable-next-line eqeqeq
        if (undefined != data) {
          this.rows.push({
            id: 999,
            values: [data.name, data.primary, data.secondary, data.issued_on],
          })
        }
      } catch (err) {
        console.log('ERR')
        console.log(err)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
</style>
