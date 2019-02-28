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
          <a :href="$router.resolve({ name: 'posts-id', params: { id: post.sha } }).href">
            {{ post.title }}
          </a>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/models/post'

export default {
  async asyncData ({ params, error, payload, route }) {
    console.warn(process.server, process.client, process.static, route)

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
