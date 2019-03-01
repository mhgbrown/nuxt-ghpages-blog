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
export default {
  computed: {
    posts () {
      // I would mapState, but I'm running into weirdness
      return this.$store.state.posts
    }
  }
}
</script>
