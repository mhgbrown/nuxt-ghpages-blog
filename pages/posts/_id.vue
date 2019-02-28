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
  async asyncData ({ params, error, payload, redirect, route }) {
    console.warn(process.server, process.client, process.static, route)

    // Don't load stuff if we're crusing the generated site
    if (process.client && process.static) {
      return redirect(route.path)
    }

    try {
      // TODO don't do this if we don't need to do it
      const post = await Post.bySha(params.id)
      return {
        post
      }
    } catch (error) {
      console.error(error.response)
    }
  }
}
</script>
