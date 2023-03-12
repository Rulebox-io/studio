<script setup>
  import {computed} from "vue"

  const myProps = defineProps({
    name: {type: String, required: true},
    url: {type: String, required: false, default: ""},
    size: {type: String, required: false, default: "md"},
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
    return {
      "background-color": stringToHslColor(myProps.name, 100, 71),
      color: stringToHslColor(myProps.name, 100, 29),
    }
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
      class="inline-block rounded-full"
      :class="size === 'sm' ? 'h-[33px] w-[33px]' : 'h-[45px] w-[45px]'"
      :src="url"
      alt="Profile image" />
    <span
      v-else
      class="inline-flex items-center justify-center rounded-full"
      :class="size === 'sm' ? 'h-[33px] w-[33px]' : 'h-[45px] w-[45px]'"
      :style="avatarStyle">
      <span
        class="font-medium leading-none"
        :class="size === 'sm' ? 'text-lg' : 'text-2xl'"
        >{{ initials }}</span
      >
    </span>
  </span>
</template>
