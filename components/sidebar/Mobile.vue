<script setup>
    import { useAppStore } from '@/store/app'
    import { XMarkIcon, HomeIcon, CubeIcon } from '@heroicons/vue/24/outline'

    const appStore = useAppStore()
    
    const isOpen = ref(appStore.mobileMenuOpen)

    appStore.$subscribe((_, state) => { isOpen.value = state.mobileMenuOpen })

    const navigation = [
        {name: "Home", href: "/", icon: HomeIcon, current: true},
        {name: "Acme Corp", href: null, icon: HomeIcon, current: false},
        {name: "Types", href: "~/entities", icon: CubeIcon, current: false},
        {name: "Rulesets", href: "~/rulesets", icon: CubeIcon, current: false},
    ]

    function closeMobile() {
        appStore.mobileMenuOpen = false
    }
</script>
<template>
    <div v-show="isOpen" class="fixed inset-0 z-40 flex flex-col md:hidden bg-desaturated-100 dark:bg-desaturated-900">
        <div class="p-4 mb-4 flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <IconsRuleboxIcon class="w-8 h-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
                <IconsRuleboxTypeIcon class="h-6 text-gray-900 dark:text-white"></IconsRuleboxTypeIcon>
            </div>
            <button @click="closeMobile">
                <XMarkIcon class="text-gray-900 dark:text-white w-9 h-9"></XMarkIcon>
            </button>
        </div>

        <nav class="flex flex-col space-y-2">
            <template v-for="item in navigation" :key="item.name">
                <a :href="item.href" class="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-desaturated-200 dark:bg-desaturated-800 rounded-md">
                    <item.icon class="w-6 h-6"></item.icon>
                    <span class="ml-3">{{item.name}}</span>
                </a>
            </template>
        </nav>
    </div>
</template>