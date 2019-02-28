<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <ul class="list--unstyled">
        <li v-for="post in posts" :key="post.sha">
          <nuxt-link :to="{ name: 'posts-id', params: { id: post.sha } }">
            {{ post.title }}
          </nuxt-link>
        </li>
      </ul>
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
      const allPosts = await Post.all()
      const posts = allPosts.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
      })

      return {
        posts
      }
    } catch (error) {
      console.error(error.response)
    }
  }
}
</script>
