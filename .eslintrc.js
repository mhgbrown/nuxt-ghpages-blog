module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'standard'
  ],
  rules: {
    'no-console': [
      'error', {
        allow: ['warn', 'error']
      }
    ],
    'vue/no-v-html': false
  }
}
