<script setup>
  const route = useRoute()
  const config = useRuntimeConfig()

  const {pending, data: rulesets} = useLazyFetch(
    `${config.public.studioApiUrl}/rule?tenant=${route.params.tenant}`
  )

  const newEntity = () => {
    // eslint-disable-next-line no-alert
    alert("New ruleset")
  }
</script>

<template>
  <div>
    <div class="my-4 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1
        class="flex items-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Rules
        <CommonButton class="ml-auto" @click="newEntity"
          >Create ruleset</CommonButton
        >
      </h1>
    </div>
    <div v-if="!pending" class="mx-auto my-4 max-w-7xl px-4 sm:px-6 md:px-8">
      <RulesRulesetList :rulesets="rulesets"></RulesRulesetList>
    </div>
  </div>
</template>
