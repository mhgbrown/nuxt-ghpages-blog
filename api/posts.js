import axios from 'axios'

const cache = {}

export default {
  async bySha (sha) {
    let url = `https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/blobs/${sha}`
    // there's only a access token present when we're generating
    if (process.env.GITHUB_TOKEN) {
      url = url + `?access_token=${process.env.GITHUB_TOKEN}`
    }

    if (!cache[url]) {
      const { data } = await axios.get(url)
      cache[url] = data
    }

    return cache[url]
  },
  async all () {
    const postsPath = 'posts/'
    let url = `https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/trees/master?recursive=1`
    // there's only a access token present when we're generating
    if (process.env.GITHUB_TOKEN) {
      url = url + `&access_token=${process.env.GITHUB_TOKEN}`
    }

    if (!cache[url]) {
      const { data } = await axios.get(url)
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
