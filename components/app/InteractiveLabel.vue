<script setup>
    import { XMarkIcon } from '@heroicons/vue/20/solid';
    const emit = defineEmits(["click"])
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
    <button
        @click="emit('click')"
        class="flex items-center text-sm text-gray-900 space-x-2 px-[8px] py-[6px] border rounded-full font-medium dark:text-white  border-rulebox-500 dark:border-desaturated-600">
        <span class="rounded-full w-[10px] h-[10px]"
        :style="bg"
></span>
        <span><slot></slot></span>
        <XMarkIcon class="w-5 h-5"></XMarkIcon>
    </button>
</template>