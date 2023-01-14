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
    <div
        class="flex items-center space-x-2 bg-gray-50 border border-rulebox-500 rounded-md text-gray-900 px-4 h-lesserbutton focus-within:ring-2 focus-within:outline-none focus-within:ring-rulebox-500 focus-within:ring-offset-2 dark:border-desaturated-500 dark:bg-desaturated-800 dark:text-white  dark:focus-within:ring-rulebox-200">
        <slot></slot>
        <input
        :placeholder="myProps.placeholder" 
        v-model="model" :disabled="disabled" 
        type="text" class="w-full bg-gray-50 focus:outline-none dark:placeholder:text-[#b8b8b8] dark:bg-desaturated-800" />
    </div>

</template>