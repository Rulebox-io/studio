<script setup>
    const myProps = defineProps(
        {
            labelColor: {type: String, required: true},
        }
    )

    const bg = computed(() => {
        return { background: myProps.labelColor }
    })
</script>
<template>
    <div class="flex items-center text-sm text-gray-900 space-x-2 px-[8px] py-[6px] font-medium dark:text-white">
        <span class="rounded-full w-[10px] h-[10px]"
        :style="bg"
        ></span>
        <span><slot></slot></span>
    </div>
</template>