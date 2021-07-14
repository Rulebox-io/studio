<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="
          block
          w-full
          focus:ring-rulebox-500
          focus:border-rulebox-500
          border-gray-300
          rounded-md
        "
      >
        <option
          v-for="tab in tabs"
          :key="tab.id"
          :selected="tab.id === selectedTab"
        >
          {{ tab.display }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <TabItem
          v-for="tab in tabs"
          :id="tab.id"
          :key="tab.id"
          :display="tab.display"
          :url="tab.url"
          :selected="tab.id === selectedTab"
        ></TabItem>
      </nav>
    </div>
  </div>
</template>
<script>
import TabItem from './TabItem'
export default {
  components: { TabItem },
  props: { tabs: { type: Array, required: true } },
  data() {
    return {
      selectedTab:
        undefined !== this.tabs && this.tabs.length > 0
          ? this.tabs[0].id
          : null,
    }
  },
}
</script>