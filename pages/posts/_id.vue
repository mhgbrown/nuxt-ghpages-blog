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
      <h1>{{ post.title }}</h1>
      <div v-html="post.html"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/models/post'

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
  }
}
</script>
