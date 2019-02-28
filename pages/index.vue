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
          <router-link :to="{ name: 'posts-id', params: { id: post.sha } }">
            {{ post.title }}
          </router-link>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/models/post'

export default {
  async asyncData () {
    console.warn(process.server, process.client, process.static)

    // Don't load stuff if we're crusing the generated site
    if (process.client && process.static) {
      return
    }

    const posts = (await Post.all()).sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date)
    })

    return {
      posts
    }
  }
}
</script>
