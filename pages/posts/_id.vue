<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/models/post'

export default {
  async fetch ({ store, params }) {
    const targetPost = store.state.posts.find(post => post.sha === params.id)
    // see if post corresponding to this id has html
    // if it doesn't exist or doesn't have content, load from api and replace in store
    if (!targetPost || !targetPost.html) {
      const post = await Post.bySha(params.id)
      store.dispatch('replacePost', { post })
    }
  },
  computed: {
    post () {
      return this.$store.state.posts.find(post => post.sha === this.$route.params.id)
    }
  }
  // NEXT! see if we can avoid using an anchor tag and use the proper route
  // async asyncData ({ params, error, payload, route }) {
  //   console.warn(process.server, process.client, process.static, route)
  //
  //   // Don't load stuff if we're crusing the generated site
  //   if (process.client && process.static) {
  //     window.location.href = route.path
  //     return
  //   }
  //
  //   try {
  //     // TODO don't do this if we don't need to do it
  //     const post = await Post.bySha(params.id)
  //     return {
  //       post
  //     }
  //   } catch (error) {
  //     console.error(error.response)
  //   }
  // }
}
</script>
