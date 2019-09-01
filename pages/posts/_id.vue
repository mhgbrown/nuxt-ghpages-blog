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
        This is a
        <nuxt-link :to="{ name: 'index' }">
          blog
        </nuxt-link>
        post by
        <a href="https://mhgbrown.is">
          Morgan Brown
        </a>
      </p>
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
      <p>
        <i>
          See something you want to change?
          <a :href="`https://github.com/mhgbrown/nuxt-ghpages-blog-content/edit/master/posts/${post.filename}`">
            Submit a proposal via Github.
          </a>
        </i>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import Post from '@/models/post'

export default {
  async fetch ({ store, params, redirect }) {
    const targetPost = store.state.posts.find(post => post.sha === params.id)
    // see if post corresponding to this id has html
    // if it doesn't exist or doesn't have content, load from api and replace in store
    if (!targetPost || !targetPost.html) {
      try {
        const post = await Post.bySha(params.id)
        store.dispatch('replacePost', { post })
      } catch (error) {
        console.error(error)
        window.location = '/'
      }
    }
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.post.excerpt }
      ]
    }
  },
  computed: {
    post () {
      return this.$store.state.posts.find(post => post.sha === this.$route.params.id)
    }
  }
}
</script>
