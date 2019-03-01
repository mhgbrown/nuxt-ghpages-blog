import Post from '../models/post'
import postsClient from '../api/posts'

export const state = () => ({
  posts: []
})

export const mutations = {
  SET_POSTS (state, { posts }) {
    state.posts = posts
  },
  ADD_POST (state, { post }) {
    state.posts.push(post)
  },
  REPLACE_POST (state, { post, index }) {
    state.posts.splice(index, 1, post)
  }
}

export const actions = {
  replacePost ({ commit, state }, { post }) {
    const index = state.posts.findIndex(spost => spost.sha === post.sha)
    if (index === -1) {
      commit('ADD_POST', { post })
      return
    }

    commit('REPLACE_POST', { post, index })
  },
  async nuxtServerInit ({ state, commit }) {
    const rawPosts = await postsClient.all()
    const posts = await Promise.all(rawPosts.map((rawPost) => {
      return Post.bySha(rawPost.sha)
    }))

    commit('SET_POSTS', { posts })
  }
}
