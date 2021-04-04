import axios from 'axios'

const cache = {}

export default {
  async bySha (sha) {
    const url = `https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/blobs/${sha}`
    const options = {}
    // there's only a access token present when we're generating
    if (process.env.GITHUB_TOKEN) {
      options.headers = {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    }

    if (!cache[url]) {
      const { data } = await axios.get(url, options)
      cache[url] = data
    }

    return cache[url]
  },
  async all () {
    const postsPath = 'posts/'
    const url = `https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/trees/master?recursive=1`
    const options = {}
    // there's only a access token present when we're generating
    if (process.env.GITHUB_TOKEN) {
      options.headers = {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    }

    if (!cache[url]) {
      const { data } = await axios.get(url, options)
      const posts = data.tree.reduce((memo, node) => {
        if (node.path.startsWith(postsPath)) {
          memo.push(node)
        }

        return memo
      }, [])

      cache[url] = posts
    }

    return cache[url]
  }
}
