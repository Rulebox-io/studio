const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require('tailwindcss/plugin');

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
    extend: {
      ring: ["focus-within", "dark-focus-within"],
    },
  },
  theme: {
    extend: {
      backgroundImage: (_) => ({
        "rulebox-logo": "url('~/assets/logo.svg')",
        "rulebox-logo-dark": "url('~/assets/logo-dark.svg')",
        "gradient-radial": "radial-gradient(100% 75% at 50% 25%, var(--tw-gradient-stops))",
      }),
      borderRadius: {
        'md': '0.429rem',
      },  
      colors: {
        rulebox: {
          50: "#eee5ff",
          100: "#DCCCFF",
          200: "#BEA1FC",
          300: "#A179F6",
          400: "#8859EE",
          500: "#6E38E0",
          600: "#4F15CB",
          700: "#390A9E",
          800: "#230368",
          900: "#100033",
        },
        desaturated: {
          100: "#E7E6EA",
          200: "#C0B9D0",
          300: "#9988BF",
          400: "#7355B4",
          500: "#5A4091",
          600: "#44306E",
          700: "#34294C",
          800: "#231F2E",
          900: "#141216",
        },
        leftshift: {
          50: "#ECE5FF",
          100: "#D9CCFF",
          200: "#B8A1FC",
          300: "#9879F6",
          400: "#7E59EE",
          500: "#6238E0",
          600: "#4315CB",
          700: "#2F0A9E",
          800: "#1C0368",
          900: "#0D0033",          
        },

        gray: {
          50: "#f2f2f2",
          100: "#E6E6E6",
          200: "#CFCFCF",
          300: "#B8B8B8",
          400: "#A3A3A3",
          500: "#8C8C8C",
          600: "#707070",
          700: "#545454",
          800: "#363636",
          900: "#1A1A1A",          
        },
        green: {
          default: "#08950E",          
          500: "#08950E",
        }
      },
      fontFamily: {
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "lg": "1.143rem",
        "xl": "1.286rem",
        "2xl": "1.429rem",

      },
      height: {
        'fullbutton': "39px",
        'lesserbutton': "33px",
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
     addBase({
        'html': { fontSize: "14px" },
      })
    }),
  ],
}
