<script setup>
  // eslint-disable-next-line no-unused-vars
  const myProps = defineProps({
    ruleset: {type: Object, required: true},
  })
</script>

<template>
  <div>{{ ruleset.id }}</div>
</template>
