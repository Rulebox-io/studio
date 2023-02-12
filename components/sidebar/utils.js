import {  HomeIcon, FolderIcon, CubeIcon } from '@heroicons/vue/24/outline'

export function buildNavigation(user) {
    let navigation = [
        {name: "Home", href: "/", icon: HomeIcon, current: true},
    ]

    for(const tenant of Object.keys(user.tenants)) {
        navigation.push({name: tenant, href: null, icon: FolderIcon, current: false})
        navigation.push({name: "Types", href: `/${tenant}/entities`, icon: CubeIcon, current: false})
        navigation.push({name: "Rulesets", href: `/${tenant}/rulesets`, icon: CubeIcon, current: false})
    }

    return navigation
}