<template>
  <v-layout
    column
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <p>
        This is a blog by
        <a href="https://mhgbrown.is">
          Morgan Brown
        </a>
      </p>
      <ul class="list--unstyled">
        <li v-for="post in activePosts" :key="post.sha">
          <nuxt-link :to="{ name: 'posts-id', params: { id: post.sha } }">
            {{ post.title }}
          </nuxt-link>
        </li>
      </ul>
      <p class="mt-3">
        Older, more embarrassing posts
      </p>
      <ul class="list--unstyled">
        <li v-for="post in archivedPosts" :key="post.sha">
          <nuxt-link :to="{ name: 'posts-id', params: { id: post.sha } }">
            {{ post.title }}
          </nuxt-link>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    posts () {
      // I would mapState, but I'm running into wie
      return this.$store.state.posts
        .slice(0)
        .sort((a, b) => b.date - a.date)
    },
    activePosts () {
      return this.posts.filter(post => !post.archived)
    },
    archivedPosts () {
      return this.posts.filter(post => post.archived)
    }
  }
}
</script>
