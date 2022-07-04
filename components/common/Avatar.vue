<script setup>
  import {computed} from "vue"

  const myProps = defineProps({
    name: {type: String, required: true},
    url: {type: String, required: false, default: ""},
  })

  const initials = computed(() => {
    if (!myProps.name) {
      return "..."
    }

    // Pick the part before the @ sign, if there is one.
    const atSign = myProps.name.indexOf("@")
    const relevant = atSign > 0 ? myProps.name.substr(0, atSign) : myProps.name

    // Try to split using dots and spaces.
    const parts = relevant.split(/[ .]/)
    if (parts.length === 0) {
      return "..."
    } else if (parts.length === 1) {
      return parts[0][0]
    } else return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  })

  const avatarStyle = computed(() => {
    return {"background-color": stringToHslColor(myProps.name, 60, 50)}
  })

  /**
   * Converts a string to a HSL colour.
   * @param {str} string The string.
   * @param {s} int The saturation (0..100)
   * @param {l} int The lightness (0..100);
   * @returns The HSL colour string.
   */
  function stringToHslColor(str, s, l) {
    if (!str) {
      return "#aaa"
    }
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const h = hash % 360
    return `hsl(${h}, ${s}%, ${l}%)`
  }
</script>

<template>
  <span>
    <img
      v-if="url"
      class="inline-block h-10 w-10 rounded-full md:h-9 md:w-9"
      :src="url"
      alt="Profile image" />
    <span
      v-else
      class="inline-flex h-10 w-10 items-center justify-center rounded-full md:h-9 md:w-9"
      :style="avatarStyle">
      <span class="font-medium leading-none text-white">{{ initials }}</span>
    </span>
  </span>
</template>

<style lang="postcss" scoped>
  div.avatar-lg > * {
    @apply h-12 w-12;
  }
</style>
