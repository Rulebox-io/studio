<script setup>
    const myProps = defineProps(
        {
            model: {type: String, required: true},
            disabled: {type: Boolean, default: false},
            placeholder: {type: String, default: ""},

        }
    )
</script>
<template>
    <input
        :placeholder="myProps.placeholder" 
        v-model="model" :disabled="disabled" 
        type="text" 
        class="bg-gray-50 border border-rulebox-500 rounded-md text-gray-900 px-4 h-lesserbutton focus:outline-none focus:ring-2 focus:ring-rulebox-500 focus:ring-offset-2 dark:border-desaturated-500 dark:bg-desaturated-800 dark:text-white dark:placeholder:text-[#b8b8b8] dark:focus:ring-rulebox-200" />
</template>