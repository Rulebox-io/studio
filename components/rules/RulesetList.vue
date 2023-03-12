<script setup>
  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    rulesets: {type: Array, required: true},
  })
</script>

<template>
  <div class="overflow-hidden bg-white shadow dark:bg-gray-900 sm:rounded-md">
    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="ruleset in rulesets" :key="ruleset.id">
        <RulesRulesetListItem :ruleset="ruleset"></RulesRulesetListItem>
      </li>
    </ul>
  </div>
</template>
