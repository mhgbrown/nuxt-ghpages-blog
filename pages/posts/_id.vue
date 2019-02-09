<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <p>{{ matter.data.title }}</p>
      {{matter}}
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/models/post'
import * as matter from 'gray-matter'
import Remarkable from 'remarkable'
import hljs from 'highlightjs'
import { atob } from 'abab'

// MDN sourced function to properly decode chinese, etc characters
function b64DecodeUnicode (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

// Actual default values
const md = new Remarkable({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (err) {}

    return '' // use external default escaping
  }
})

export default {
  async asyncData ({ params, error, payload }) {
    try {
      const post = await Post.bySha(params.id)
      return {
        post
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.response)
      throw error
    }
  },
  computed: {
    decodedContent () {
      return b64DecodeUnicode(this.post.content)
    },
    matter () {
      return matter(this.decodedContent)
    },
    html () {
      return md(this.matter.content)
    }
  }
}
</script>
