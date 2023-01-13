<script setup>
import { CubeIcon, PencilIcon } from '@heroicons/vue/24/outline';

    const myProps = defineProps(
        {
            what: {type: String, required: true},
            display: {type: String, required: true},
            description: {type: String, required: true},
            tag: {type: String, required: true},
            labels: {type: Array, required: true},
        }
    )
    const emit = defineEmits(["click"])
</script>
<template>
    <div class="flex flex-col px-4 py-6  rounded-md space-y-4 font-medium text-base text-gray-900 border-2 border-rulebox-500 bg-gray-50 dark:text-white dark:border-desaturated-300 dark:bg-gradient-radial dark:from-desaturated-700 dark:to-desaturated-800">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <CubeIcon class="w-6 h-6"></CubeIcon>
                <span>{{  display }}</span>
            </div>
            <button @click="emit('click')">
                <PencilIcon class="w-6 h-6" ></PencilIcon>
            </button>
        </div>
        <div class="max-h-12 overflow-clip text-gray-700 dark:text-gray-200">{{ description }}</div>
        <div class="flex items-center space-x-5">
            <AppTag class="bg-rulebox-100 dark:bg-desaturated-700">{{  tag  }}</AppTag>
            <AppLabel v-for="label in labels" :key="label" labelColor="#6AFFE4">{{ label }}</AppLabel>
        </div>
    </div>
</template>