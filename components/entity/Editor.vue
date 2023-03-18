<script setup>
  import {Cog8ToothIcon} from "@heroicons/vue/20/solid"
  import {createTagName} from "@/components/util/util"

  const myProps = defineProps({
    mode: {type: String, default: "edit"},
    display: {type: String, required: true},
    description: {type: String, required: true},
    tag: {type: String, required: true},
    labels: {type: Array, required: true},
  })

  const newtag = computed(() => {
    switch (myProps.mode) {
      case "new":
        return createTagName(myProps.display)
      default:
        return myProps.tag
    }
  })

  const validationError = ref(null)

  const status = ref("none")

  const emit = defineEmits(["close", "save"])

  const cancel = () => {
    emit("close")
  }

  const save = () => {
    status.value = "saving"
    try {
      const x = null.y
      console.log(x)
      /*
      emit("save", {
        display: myProps.display.value,
        description: myProps.description.value,
        tag: myProps.tag.value,
        labels: myProps.labels.value,
      })
      status.value = "saved"
      */
    } catch (e) {
      status.value = "none"
      validationError.value =
        "There is already a type with this tag. Please choose another."
    }
  }
</script>
<template>
  <div class="flex flex-col justify-between">
    <div
      class="flex flex-col space-y-6 text-base font-medium text-gray-900 dark:text-white md:mx-auto md:w-[325px]">
      <h2 class="text-lg font-bold">Display name</h2>
      <CommonTextbox
        :model="display"
        placeholder="Enter a name for your type" />
      <AppValidationError v-if="validationError">
        {{ validationError }}
      </AppValidationError>
      <div class="flex items-center space-x-4">
        <h2 class="text-lg font-bold">Tag</h2>
        <AppCopyableTag>{{ newtag }}</AppCopyableTag>
      </div>
      <h2 class="text-lg font-bold">Description</h2>
      <CommonTextbox
        :model="description"
        placeholder="Enter a description (optional)" />
      <h2 class="text-lg font-bold">Labels</h2>
      <div class="items-align flex flex-wrap">
        <AppLabel v-for="label in labels" :key="label" label-color="#6AFFE4">{{
          label
        }}</AppLabel>
        <button
          class="flex h-lesserbutton items-center justify-center rounded-full border border-desaturated-200 px-4 text-gray-600 dark:border-desaturated-700 dark:text-gray-200">
          New label...
        </button>
      </div>
    </div>
    <div class="flex items-center justify-end space-x-4 py-4 md:pb-0">
      <CommonButton
        variant="secondary"
        :disabled="status === 'saving'"
        @click="cancel"
        >Cancel</CommonButton
      >
      <CommonButton
        v-if="status === 'none'"
        class="flex-grow md:flex-grow-0"
        @click="save">
        <span>Save changes</span>
      </CommonButton>
      <div v-if="status === 'saving'">
        <AppPendingSpinner class="flex-grow md:flex-grow-0">
          <Cog8ToothIcon class="h-5 w-5 animate-spin"></Cog8ToothIcon>
          <span>Saving...</span></AppPendingSpinner
        >
      </div>
    </div>
  </div>
</template>
