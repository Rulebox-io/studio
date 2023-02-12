<script setup>
    import { useStore } from '@/store/user'
    import { buildNavigation }  from './utils'

    const userStore = useStore()

    const navigation = buildNavigation({ tenants:userStore.tenants })

    const name = userStore.displayName
    const picture = null
</script>
<template>
    <div class="w-[232px] hidden inset-0 z-40 md:flex flex-col border-r border-r-desaturated-300 border-opacity-50 dark:border-r-desaturated-600 dark:border-opacity-50">
        <div class="p-4 mb-12 flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <IconsRuleboxIcon class="w-8 h-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
                <IconsRuleboxTypeIcon class="h-6 text-gray-900 dark:text-white"></IconsRuleboxTypeIcon>
            </div>
            <CommonAvatar size="sm" :url="picture" :name="name"> </CommonAvatar>
        </div>

        <nav class="px-4 flex flex-col space-y-2">
            <template v-for="item in navigation" :key="item.name">
                <span v-if="!item.href"
                    class="flex items-center px-4 py-2 text-base font-medium border rounded-md text-gray-700 border-transparent dark:text-gray-400">
                    <component :is="item.icon" class="w-6 h-6"></component>
                    <span class="ml-3">{{item.name}}</span>
                </span>
                <NuxtLink v-else :to="item.href"
                    class="flex items-center px-4 py-2 text-base font-medium border rounded-md"
                    :class="item.current ? 'bg-rulebox-600 border-transparent text-white dark:border-[#B0A2CD] dark:border-opacity-50 dark:bg-[#322B40] dark:bg-opacity-50 ' : 'text-gray-900 border-transparent hover:bg-rulebox-200 dark:text-white dark:hover:bg-desaturated-800'">

                    <component :is="item.icon" class="w-6 h-6"></component>
                    <span class="ml-3">{{item.name}}</span>
                </NuxtLink>
            </template>
        </nav>        
    </div>
</template>