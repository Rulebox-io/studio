<script setup>
import { ClipboardDocumentIcon } from '@heroicons/vue/20/solid'
</script>
<template>
    <div class="w-full rounded-md h-lesserbutton flex items-center justify-between px-4 font-medium font-mono bg-gray-50 text-gray-900 dark:bg-desaturated-800 dark:text-white">
        <span><slot></slot></span>
        <ClipboardDocumentIcon class="w-5 h-5"></ClipboardDocumentIcon>        
    </div>
</template>