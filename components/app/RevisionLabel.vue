<script setup>
    const myProps = defineProps(
        {
            revision: {type: Number, required: true},
            status: { type: String, required: true }
        }
    )
</script>
<template>
    <div 
        class="flex items-align border rounded-full font-medium text-base px-4 py-[5px]"
        :class="myProps.status==='published' ? 'bg-green-500 text-white border-green-500' : 'bg-none text-gray-900 border-desaturated-200 dark:bg-desaturated-800 dark:text-white dark:border-desaturated-300'"
        >Rev {{ myProps.revision }}</div>
</template>