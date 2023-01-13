<script setup>
    import { ChevronDownIcon } from '@heroicons/vue/20/solid';
    const myProps = defineProps(
        {            
            disabled: {type: Boolean, default: false},
        }
    )
    const emit = defineEmits(["click"])

    function click() {
        emit("click")
    }
</script>
<template>
    <button
        :disabled="myProps.disabled" 
        @click="click" 
        class="flex items-center space-x-2 pl-4 pr-[6px] h-lesserbutton rounded-md border border-rulebox-500 bg-none font-medium text-gray-900 enabled:hover:border-transparent enabled:hover:bg-rulebox-200 dark:border-desaturated-600 dark:text-white  dark:enabled:hover:bg-desaturated-800 dark:enabled:hover:border-desaturated-500 dark:focus:ring-rulebox-200">
        <span class="inline-block truncate"><slot></slot></span>
        <ChevronDownIcon class="w-5 h-5"></ChevronDownIcon>
    </button>
</template>