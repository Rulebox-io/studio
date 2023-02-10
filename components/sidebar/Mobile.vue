<script setup>
    import { useAppStore } from '@/store/app'
    import { useStore } from '@/store/user'
    import { XMarkIcon, HomeIcon, CubeIcon, AdjustmentsVerticalIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

    const appStore = useAppStore()
    const userStore = useStore()

    const isOpen = ref(appStore.mobileMenuOpen)

    appStore.$subscribe((_, state) => { isOpen.value = state.mobileMenuOpen })

    const navigation = [
        {name: "Home", href: "/", icon: HomeIcon, current: true},
        {name: "Acme Corp", href: null, icon: HomeIcon, current: false},
        {name: "Types", href: "~/entities", icon: CubeIcon, current: false},
        {name: "Rulesets", href: "~/rulesets", icon: CubeIcon, current: false},
    ]

    const name = userStore.displayName
    const picture = null

    function closeMobile() {
        appStore.mobileMenuOpen = false
    }
</script>
<template>
    <div v-show="isOpen" class="fixed inset-0 z-40 flex flex-col md:hidden bg-desaturated-100 dark:bg-desaturated-900">
        <div class="-z-10 fixed inset-x-0 top-[-230px] h-[576px] bg-gradient-to-r blur-[100px]  from-[rgba(255,170,0,1)] via-[rgba(132,70,255,1)] to-[rgba(1,255,1,1)]  dark:from-[rgba(255,170,0,0.5)] dark:via-[rgba(132,70,255,0.5)] dark:to-[rgba(1,255,1,0.5)] dark:h-[270px]"></div>
        <div class="p-4 mb-4 flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <IconsRuleboxIcon class="w-8 h-8 text-rulebox-500 dark:text-white"></IconsRuleboxIcon>
                <IconsRuleboxTypeIcon class="h-6 text-gray-900 dark:text-white"></IconsRuleboxTypeIcon>
            </div>
            <button @click="closeMobile">
                <XMarkIcon class="text-gray-900 dark:text-white w-9 h-9"></XMarkIcon>
            </button>
        </div>

        <nav class="px-6 flex flex-col space-y-2">
            <template v-for="item in navigation" :key="item.name">
                <a :href="item.href"
                    class="flex items-center px-4 py-2 text-base font-medium border dark:text-white rounded-md"
                    :class="item.current ? 'bg-rulebox-600 border-transparent text-white dark:border-[#B0A2CD] dark:border-opacity-50 dark:bg-[#322B40] dark:bg-opacity-50 ' : ' text-gray-900 border-transparent'">

                    <component :is="item.icon" class="w-6 h-6"></component>
                    <span class="ml-3">{{item.name}}</span>
                </a>
            </template>
        </nav>

        <div class="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl px-6 pt-4 pb-6 flex flex-col text-gray-900 dark:text-white dark:bg-transparent">
            <SidebarProfile :name="name" :url="picture"></SidebarProfile>

            <nav class="flex flex-col space-y-2 mt-4">
                <a href="prefs"
                    class="border-none flex items-center px-4 py-2 text-base font-medium border dark:text-white text-gray-900">

                    <AdjustmentsVerticalIcon class="w-6 h-6"></AdjustmentsVerticalIcon>
                    <span class="ml-3">Preferences</span>
                </a>
                <a href="signout"
                    class="border-none flex items-center px-4 py-2 text-base font-medium border dark:text-white text-gray-900">

                    <ArrowRightOnRectangleIcon class="w-6 h-6"></ArrowRightOnRectangleIcon>
                    <span class="ml-3">Sign out</span>
                </a>
            </nav>
        </div>

    </div>
</template>