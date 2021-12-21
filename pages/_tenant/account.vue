<template>
  <div>
    <div class="bg-white shadow dark:bg-gray-900 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <TabBar :tabs="tabs"></TabBar>
      </div>
    </div>
    <NuxtChild class="py-6" />
  </div>
</template>
<script>
import TabBar from '@/components/common/TabBar'
const tabs = [
  {
    id: 'profile',
    display: 'Profile',
    url: `profile`,
  },
  {
    id: 'users',
    display: 'Users',
    url: `users`,
  },
  {
    id: 'billing',
    display: 'Billing',
    url: `billing`,
  },
  {
    id: 'other',
    display: 'Other',
    url: `other`,
  },
]
export default {
  components: { TabBar },
  middleware: 'magicauth',
  data() {
    return {
      tabs,
    }
  },
}
</script>