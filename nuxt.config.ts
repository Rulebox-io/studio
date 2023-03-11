// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    app: {
        head: {
            charset: "utf-8",
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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

/*
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
*/