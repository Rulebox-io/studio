<script setup>
    const myProps = defineProps({
        display: { type: String },
        description: { type: String, required: true },
        tag: { type: String, required: true },
        labels: { type: Array, required: true },
    })

    const emit = defineEmits(['close', 'save'])

    const cancel = () => {
        emit('close')
    }

    const save = () => {
        emit('save', {
            display: display.value,
            description: description.value,
            tag: tag.value,
            labels: labels.value,
        })
    }
</script>
<template>
    <div class="flex flex-col justify-between">

        <div class="md:w-[325px] md:mx-auto flex flex-col space-y-6 text-base font-medium text-gray-900 dark:text-white">
            <h2 class="text-lg font-bold">Display name</h2>
            <CommonTextbox :model="display" />
            <div class="flex items-center space-x-4">
                <h2 class="text-lg font-bold">Tag</h2>
                <AppCopyableTag>{{tag}}</AppCopyableTag>
            </div>
            <h2 class="text-lg font-bold">Description</h2>
            <CommonTextbox :model="description" />
            <h2 class="text-lg font-bold">Labels</h2>
            <div class="flex items-align flex-wrap">
                <AppLabel v-for="label in labels" :key="label" labelColor="#6AFFE4">{{ label }}</AppLabel>
                <button class="flex items-center justify-center h-lesserbutton px-4 rounded-full border border-desaturated-200 text-gray-600 dark:border-desaturated-700 dark:text-gray-200 ">
                    New label...
                </button>
            </div>
        </div>
        <div class="flex items-center space-x-4 justify-end py-4 md:pb-0">
          <CommonButton @click="cancel" variant="secondary">Cancel</CommonButton>
          <CommonButton @click="save" class="flex-grow md:flex-grow-0">
            <span>Save changes</span>
          </CommonButton>
        </div>        
    </div>

</template>