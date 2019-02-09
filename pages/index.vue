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
      <h1>Posts</h1>
      <ul>
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
    const posts = await Post.all()
    return {
      posts
    }
  }
}
</script>
