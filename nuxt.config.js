
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Rulebox Studio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /**
   * Router middleware
   */
  router: {
    middleware: ['auth']
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/emotion',
    '@nuxtjs/auth',
    '@chakra-ui/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },

  chakra: {
    extendTheme: {
      colors: {
        brand: {
          50: '#e8e0f4',
          100: '#c6b0e4',
          200: '#a481d4',
          300: '#8152c4',
          400: '#6237a0',
          500: '#542f89',
          600: '#462772',
          700: '#381f5b',
          800: '#2a1744',
          900: '#1c102e'
        }
      },
      container: ['100%', '480px', '768px', '992px'],
      fonts: {
        myheading: '"Avenir Next", sans-serif'
      }
    }
  },
  auth: {
    plugins: [
      '~/plugins/appmetadata.js'
    ],
    redirect: {
      home: '/ruleset',
      login: '/auth/sign-in', // redirect user when not connected
      callback: '/auth/signed-in'
    },
    strategies: {
      local: false,
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_API_ID
      }
    }
  }
}
