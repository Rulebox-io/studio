<script setup>
    import { CubeIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline'

    const myProps = defineProps({
        name: {type: String, required: true},
        revision: {type: Number, required: true},
        status: {type: String, required: true},
        rulesets: {type: Array, required: false, default: () => []},
    })
</script>
<template>
    <div class="flex flex-col space-y-2 font-medium text-base text-gray-900 dark:text-white">
        <div class="flex items-center space-x-4">
            <CubeIcon class="w-6 h-6"></CubeIcon>
            <span>{{ name }}</span>
            <AppRevisionLabel :revision="revision" :status="status"></AppRevisionLabel>
        </div>
        <div v-for="ruleset in rulesets" :key="ruleset.id" class="flex items-center space-x-4">
            <ChevronDoubleRightIcon class="w-6 h-6"></ChevronDoubleRightIcon>
            <CubeIcon class="w-6 h-6"></CubeIcon>
            <span class="text-gray-700 dark:text-gray-200">{{ ruleset.name }}</span>
            <AppRevisionLabel :revision="ruleset.revision" :status="ruleset.status"></AppRevisionLabel>
        </div>
    </div>
</template>