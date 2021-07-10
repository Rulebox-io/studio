<template>
  <div>
    <img
      v-if="url"
      class="inline-block h-10 md:h-9 w-10 md:w-9 rounded-full"
      :src="url"
      alt="Profile image"
    />
    <div
      v-else
      class="
        inline-block
        h-10
        md:h-9
        w-10
        md:w-9
        rounded-full
        flex
        items-center
        justify-center
      "
      :style="avatarStyle"
    >
      <span class="font-medium leading-none text-white">{{ initials }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: { type: String, required: true },
    name: { type: String, required: true },
  },
  computed: {
    initials() {
      // eslint-disable-next-line eqeqeq
      if (undefined == this.name) return '...'

      // Pick the part before the @ sign, if there is one.
      const atSign = this.name.indexOf('@')
      const relevant = atSign > 0 ? this.name.substr(0, atSign) : this.name

      // Try to split using dots and spaces.
      const parts = relevant.split(/[ .]/)
      if (parts.length === 0) return '...'
      else if (parts.length === 1) return parts[0][0]
      else return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    },
    avatarStyle() {
      return { 'background-color': stringToHslColor(this.name, 60, 50) }
    },
  },
}

/**
 * Converts a string to a HSL colour.
 * @param {str} string The string.
 * @param {s} int The saturation (0..100)
 * @param {l} int The lightness (0..100);
 * @returns The HSL colour string.
 */
function stringToHslColor(str, s, l) {
  if (!str) return '#aaa'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}
</script>
<style lang="postcss" scoped>
div.avatar-lg > * {
  @apply h-12 w-12;
}
</style>