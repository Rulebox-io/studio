<script setup>
    const myProps = defineProps({
        revisions: {type: Array, required: true},
    })
</script>
<template>
    <div class="flex flex-col space-y-2">
        <template v-for="revision in myProps.revisions" :key="revision.id">
            <AppRevisionInfo :revision="revision.revision" :status="revision.status" :date="revision.date" :name="revision.name" :url="revision.url"></AppRevisionInfo>
            <IconsVerticalSeparatorIcon class="last:hidden ml-6 w-6 h-6 text-gray-800 dark:text-gray-200"></IconsVerticalSeparatorIcon>
        </template>
    </div>
</template>