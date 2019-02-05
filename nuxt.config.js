const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const axios = require('axios')
const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  /**
   * Static generation configuration
   */
  generate: {
    async routes () {
      try {
        const postsDirectory = 'posts/'
        const url = `https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/trees/master?recursive=1&access_token=${process.env.GITHUB_TOKEN}`
        const response = await axios.get(url)
        return response.data.tree.reduce((memo, node) => {
          if (node.path.startsWith(postsDirectory)) {
            // NB: route is actually the same as node.path in my case
            memo.push({
              route: `/posts/${node.sha}`,
              payload: node
            })
          }

          return memo
        }, [])
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.response)
        throw error
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
