const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./assets/**/*.scss",
    "./assets/**/*.css",
  ],
  darkMode: "media",
  variants: {
    backgroundColor: [
      "dark",
      "dark-hover",
      "dark-group-hover",
      "dark-even",
      "dark-odd",
    ],
    borderColor: ["dark", "dark-focus", "dark-focus-within"],
    textColor: ["dark", "dark-hover", "dark-active"],
  },
  theme: {
    extend: {
      backgroundImage: (_) => ({
        "rulebox-logo": "url('~/assets/logo.svg')",
        "rulebox-logo-dark": "url('~/assets/logo-dark.svg')",
      }),
      colors: {
        rulebox: {
          50: "#f9fafb",
          100: "#edf1fb",
          200: "#d8daf6",
          300: "#b4b6e8",
          400: "#928cd6",
          500: "#7767c5",
          600: "#604bac",
          700: "#473886",
          800: "#301a5b",
          900: "#1b1736",
        },
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["'UntitledSans'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
