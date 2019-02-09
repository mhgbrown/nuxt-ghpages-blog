import * as matter from 'gray-matter'
import postsClient from '../api/posts'
import Markdown from '../utils/markdown'
import Base64 from '../utils/base64'

class Post {
  static async all () {
    const rawPosts = await postsClient.all()
    return rawPosts.map(rawPost => this._fromNode(rawPost))
  }

  static async bySha (sha) {
    const rawPost = await postsClient.bySha(sha)
    return this._fromBlob(rawPost)
  }

  static _fromNode (node) {
    const post = new this(node)
    const pathPrefix = 'posts/'
    const name = node.path.replace(pathPrefix, '')
    post.title = this._extractTitle(name)
    post.date = this._extractDate(name)
    return post
  }

  static _fromBlob (blob) {
    const post = new this(blob)
    const decodedContent = Base64.decode(blob.content)
    const data = matter(decodedContent)
    post.title = data.title
    post.date = data.date
    post.html = Markdown.toHTML(data.content)
    return post
  }

  static _extractTitle (name) {
    return name.replace(/\.md$/, '')
      .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
  }

  static _extractDate (name) {
    return /^\d{4}-\d{1,2}-\d{1,2}/.exec(name)[0]
  }

  constructor (nodeOrBlob) {
    this.sha = nodeOrBlob.sha
  }
}

export default Post
