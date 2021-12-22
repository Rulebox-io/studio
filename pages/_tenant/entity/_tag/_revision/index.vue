 <template>
  <div>
    <div
      v-if="!$fetchState.pending"
      class="max-w-7xl my-4 mx-auto px-4 sm:px-6 md:px-8"
    >
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h2
            class="
              flex
              items-center
              text-2xl
              font-bold
              leading-7
              text-gray-900
              dark:text-white
              sm:text-3xl sm:truncate
            "
          >
            <CubeIcon
              class="flex-shrink-0 mr-1.5 h-8 w-8 text-gray-900 dark:text-white"
            ></CubeIcon>

            {{ display }}
            <Badge
              class="
                ml-2
                bg-transparent
                text-blue-500
                border-solid border-2 border-blue-500
              "
              >Rev {{ revision }}</Badge
            >
          </h2>
          <div
            class="
              mt-1
              flex flex-row flex-wrap
              sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6
            "
          >
            <div
              class="
                mt-2
                flex
                items-center
                text-sm text-gray-500
                dark:text-gray-300
              "
            >
              <code>{{ tag }}</code>
            </div>
            <div class="mt-2 flex items-center text-sm">
              <Badge
                v-for="label in labels"
                :key="label"
                class="
                  ml-2
                  border border-gray-300
                  bg-white
                  text-gray-700
                  hover:bg-gray-100
                  dark:border-transparent
                  dark:bg-gray-600
                  dark:text-white
                  dark:hover:bg-gray-700
                "
              >
                {{ label }}
              </Badge>
            </div>
          </div>
        </div>
        <div class="mt-5 flex items-center lg:mt-0 lg:ml-4">
          <span class="flex items-center">
            <div class="mr-3 text-sm text-gray-500 dark:text-gray-300">
              12 November 2021
            </div>
            <Avatar :name="name"> </Avatar>
          </span>

          <span class="ml-3">
            <StatusLabel :status="status"></StatusLabel>
          </span>
        </div>
      </div>
      <div
        class="
          mt-8
          max-w-3xl
          mx-auto
          grid grid-cols-1
          gap-6
          lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3
        "
      >
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="definition-title">
            <div
              class="
                bg-white
                dark:bg-gray-900
                px-4
                py-5
                shadow
                sm:rounded-lg sm:px-6
              "
            >
              <h2
                id="definition-title"
                class="
                  text-lg
                  font-medium
                  text-gray-900
                  dark:text-gray-100
                  flex
                  items-center
                "
              >
                Definition
                <Button v-if="!isEditing" class="ml-auto" @click="startEditing">
                  <PencilIcon class="h-5 w-5 mr-3"></PencilIcon>
                  Edit
                </Button>
                <Button
                  v-if="isEditing"
                  :secondary="true"
                  class="ml-auto"
                  @click="abandonChanges"
                >
                  <XCircleIcon class="w-5 h-5 mr-3"></XCircleIcon>
                  Cancel
                </Button>
                <Button v-if="isEditing" class="ml-1.5" @click="saveDraft">
                  <SaveIcon class="h-5 w-5 mr-3"></SaveIcon>
                  Save draft
                </Button>
              </h2>
              <pre
                ref="definitionEditor"
                :contenteditable="isEditing"
                class="
                  border border-gray-200
                  dark:border-gray-700
                  rounded-md
                  p-4
                  text-gray-800
                  dark:text-gray-100
                  mt-4
                "
                >{{ definition }}
            </pre
              >
            </div>
          </section>
        </div>
        <div class="lg:col-start-3 lg:col-span-1">
          <section aria-labelledby="dependencies-title">
            <div
              class="
                bg-white
                dark:bg-gray-900
                px-4
                py-5
                shadow
                sm:rounded-lg sm:px-6
              "
            >
              <h2
                id="dependencies-title"
                class="text-lg font-medium text-gray-900 dark:text-gray-100"
              >
                Dependencies
              </h2>
              <div
                class="
                  mt-4
                  text-sm
                  flex
                  items-center
                  flex-wrap
                  text-gray-800
                  dark:text-gray-200
                "
              >
                <span
                  class="
                    flex
                    items-center
                    bg-gray-100
                    dark:bg-gray-800
                    px-2
                    py-1
                    rounded-md
                  "
                >
                  <CubeIcon class="inline-block h-5 w-5 mr-1.5"></CubeIcon>
                  Invoice
                  <Badge
                    class="
                      ml-2
                      bg-transparent
                      text-blue-500
                      border-solid border-2 border-blue-500
                    "
                    >Rev 1</Badge
                  >
                </span>
                <ChevronRightIcon
                  class="inline-block h-6 w-6"
                ></ChevronRightIcon>
                <span
                  class="
                    flex
                    items-center
                    bg-gray-100
                    dark:bg-gray-800
                    px-2
                    py-1
                    rounded-md
                  "
                >
                  Is large invoice
                  <Badge
                    class="
                      ml-2
                      bg-transparent
                      text-blue-500
                      border-solid border-2 border-blue-500
                    "
                    >Rev 1</Badge
                  >
                </span>
              </div>
              <div
                class="
                  mt-4
                  text-sm
                  flex flex-wrap
                  items-center
                  text-gray-800
                  dark:text-gray-200
                "
              >
                <span
                  class="
                    flex
                    items-center
                    bg-gray-100
                    dark:bg-gray-800
                    px-2
                    py-1
                    rounded-md
                  "
                >
                  <CubeIcon class="inline-block h-5 w-5 mr-1.5"></CubeIcon>
                  Invoice
                  <Badge
                    class="
                      ml-2
                      bg-transparent
                      text-blue-500
                      border-solid border-2 border-blue-500
                    "
                    >Rev 1</Badge
                  >
                </span>
                <ChevronRightIcon
                  class="inline-block h-6 w-6"
                ></ChevronRightIcon>
                <span
                  class="
                    flex
                    items-center
                    bg-gray-100
                    dark:bg-gray-800
                    px-2
                    py-1
                    rounded-md
                  "
                >
                  Is invoice overdue
                  <Badge
                    class="
                      ml-2
                      bg-transparent
                      text-blue-500
                      border-solid border-2 border-blue-500
                    "
                    >Rev 2</Badge
                  >
                </span>
              </div>
            </div>
          </section>
          <section aria-labelledby="delete-revision">
            <Button
              class="
                w-full
                justify-center
                bg-red-600
                text-white
                hover:bg-red-700
                mt-5
              "
              @click="deleteRevision"
            >
              <TrashIcon class="w-5 h-5 mr-3"></TrashIcon>
              Delete revision
            </Button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>        
<script>
import Avatar from '@/components/common/Avatar.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
import ChevronRightIcon from '@/components/heroIcons/solid/ChevronRight'
import CubeIcon from '@/components/heroIcons/outline/CubeIcon'
import PencilIcon from '@/components/heroIcons/solid/PencilIcon.vue'
import StatusLabel from '@/components/entities/StatusLabel.vue'
import SaveIcon from '@/components/heroIcons/solid/SaveIcon.vue'
import TrashIcon from '@/components/heroIcons/solid/TrashIcon.vue'
import XCircleIcon from '@/components/heroIcons/solid/XCircleIcon.vue'

export default {
  components: {
    Avatar,
    Badge,
    Button,
    ChevronRightIcon,
    CubeIcon,
    PencilIcon,
    SaveIcon,
    StatusLabel,
    TrashIcon,
    XCircleIcon,
  },
  middleware: 'magicauth',
  data() {
    return {
      id: null,
      display: null,
      tag: null,
      labels: null,
      revision_id: null,
      revision: null,
      status: null,
      definition: null,
      isEditing: false,
    }
  },

  async fetch() {
    try {
      const { $axios } = this.$nuxt.context
      const { data } = await $axios.get(
        `${process.env.studioApiUrl}/entity?tenant=${this.$route.params.tenant}&tag=${this.$route.params.tag}&revision=${this.$route.params.revision}`
      )

      if (!data) return

      this.id = data.id
      this.display = data.name
      this.tag = data.tag
      this.labels = data.labels
      this.revision_id = data.revision.id
      this.revision = data.revision.revision
      this.definition = data.revision.definition
      this.status = data.revision.status
      this.ts = data.revision.ts
    } catch (err) {
      console.log('ERR')
      console.log(err)
    }
  },
  computed: {
    name() {
      return 'Edwin Groenendaal'
    },
  },
  methods: {
    startEditing() {
      this.isEditing = true
      this.$nextTick(() => this.$refs.definitionEditor.focus())
    },
    abandonChanges() {
      this.isEditing = false
    },
    deleteRevision() {
      this.$store.dispatch('entity/deleteEntityRevision', {
        tenant: this.$route.params.tenant,
        id: this.revision_id,
      })
    },
    saveDraft() {
      this.$store.dispatch('entity/updateEntityRevision', {
        tenant: this.$route.params.tenant,
        id: this.revision_id,
        ts: this.ts,
        content: this.$refs.definitionEditor.textContent,
      })
    },
  },
}
</script>

<style lang="postcss" scoped>
</style>
