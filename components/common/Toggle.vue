<script setup>
    const myProps = defineProps({
        selected: {type: String, required: true},
    })

    const emit = defineEmits(['select'])

    function click(which) {
        if(which === myProps.selected) {
            return
        }

        emit('select', which)
    }
</script>
<template>
    <div class="flex flex-nowrap">
        <button
        @click="click('left')"
        class="focus:z-10 flex items-center justify-center h-lesserbutton w-[33px] text-gray-900 disabled:text-gray-600 border border-rulebox-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rulebox-500 dark:text-white dark:border-desaturated-600 dark:focus:ring-rulebox-200"
        :class="selected==='left' ? 'bg-rulebox-200 dark:bg-desaturated-700' : 'bg-white enabled:hover:bg-rulebox-100 dark:bg-desaturated-900 dark:enabled:hover:bg-desaturated-800 dark:enabled:hover:border-desaturated-500'">
        <slot name="left"></slot>
    </button>
    <button
        @click="click('right')"
        class="relative left-[-1px] focus:z-10 flex items-center justify-center h-lesserbutton w-[33px] text-gray-900 disabled:text-gray-600 border border-rulebox-500 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rulebox-500 dark:text-white dark:border-desaturated-600 dark:focus:ring-rulebox-200"
        :class="selected==='right' ? 'bg-rulebox-200 dark:bg-desaturated-700' : 'bg-white enabled:hover:bg-rulebox-100 dark:bg-desaturated-900 dark:enabled:hover:bg-desaturated-800 dark:enabled:hover:border-desaturated-500'">
        <slot name="right"></slot>
    </button>

    </div>
</template>