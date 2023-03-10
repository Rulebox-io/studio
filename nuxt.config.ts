import {defineNuxtConfig} from "nuxt/config"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      magicPublishableKey: "pk_live_510BE356BE04CD4C",
      studioApiUrl: "http://localhost:9999/.netlify/functions",
    },
  },
  ssr: false,
})
