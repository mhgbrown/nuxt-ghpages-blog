import axios from 'axios'

export default {
  async bySha (sha) {
    const { data } = await axios.get(`https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/blobs/${sha}?access_token=${process.env.GITHUB_TOKEN}`)
    return data
  },
  async all () {
    const postsPath = 'posts/'
    const url = `https://api.github.com/repos/mhgbrown/nuxt-ghpages-blog-content/git/trees/master?recursive=1&access_token=${process.env.GITHUB_TOKEN}`
    const { data } = await axios.get(url)
    return data.tree.reduce((memo, node) => {
      if (node.path.startsWith(postsPath)) {
        memo.push(node)
      }

      return memo
    }, [])
  }
}
