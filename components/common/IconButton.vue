<script setup>
    const myProps = [
        {
            name: "disabled",
            type: Boolean,
            default: false,
        },
    ]

    const emit = defineEmits(["click"])

    function click() {
        emit("click")
    }
</script>
<template>
    <button
        :disabled="myProps.disabled" 
        @click="click" 
        class="flex items-center justify-center h-lesserbutton w-[33px] text-gray-900 disabled:text-gray-600 border border-rulebox-500 rounded-md enabled:hover:bg-rulebox-200 enabled:hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rulebox-500 dark:text-white dark:border-desaturated-600 dark:enabled:hover:border-desaturated-500 dark:enabled:hover:bg-desaturated-800 dark:focus:ring-rulebox-200">
        <slot></slot>
    </button>
</template>