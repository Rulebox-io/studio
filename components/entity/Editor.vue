<script setup>
  const myProps = defineProps({
    display: {type: String, required: true},
    description: {type: String, required: true},
    tag: {type: String, required: true},
    labels: {type: Array, required: true},
  })

  const emit = defineEmits(["close", "save"])

  const cancel = () => {
    emit("close")
  }

  const save = () => {
    emit("save", {
      display: myProps.display.value,
      description: myProps.description.value,
      tag: myProps.tag.value,
      labels: myProps.labels.value,
    })
  }
</script>
<template>
  <div class="flex flex-col justify-between">
    <div
      class="flex flex-col space-y-6 text-base font-medium text-gray-900 dark:text-white md:mx-auto md:w-[325px]">
      <h2 class="text-lg font-bold">Display name</h2>
      <CommonTextbox :model="display" />
      <div class="flex items-center space-x-4">
        <h2 class="text-lg font-bold">Tag</h2>
        <AppCopyableTag>{{ tag }}</AppCopyableTag>
      </div>
      <h2 class="text-lg font-bold">Description</h2>
      <CommonTextbox :model="description" />
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
      <CommonButton variant="secondary" @click="cancel">Cancel</CommonButton>
      <CommonButton class="flex-grow md:flex-grow-0" @click="save">
        <span>Save changes</span>
      </CommonButton>
    </div>
  </div>
</template>
