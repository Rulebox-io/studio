<script setup>
  const myProps = defineProps({
    ruleset: {type: Object, required: true},
  })
</script>

<template>
  <div>{{ruleset.id}}</div>
</template>
