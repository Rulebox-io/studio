<script setup>
  const myProps = defineProps({
    tabs: {type: Array, required: true},
  })

  const selectedTab = ref(
    myProps.tabs && myProps.tabs.length > 0 ? myProps.tabs[0].id : null
  )
</script>

<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 focus:border-rulebox-500 focus:ring-rulebox-500">
        <option
          v-for="tab in myProps.tabs"
          :key="tab.id"
          :selected="tab.id === selectedTab">
          {{ tab.display }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <CommonTabItem
          v-for="tab in myProps.tabs"
          :id="tab.id"
          :key="tab.id"
          :display="tab.display"
          :url="tab.url"
          :selected="tab.id === selectedTab"></CommonTabItem>
      </nav>
    </div>
  </div>
</template>
