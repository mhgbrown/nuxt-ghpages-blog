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
    const blobMatter = matter(decodedContent)
    post.title = blobMatter.data.title
    post.archived = blobMatter.data.archived
    post.date = new Date(parseInt(blobMatter.data.date))
    post.html = Markdown.toHTML(blobMatter.content)
    return post
  }

  static _extractTitle (name) {
    return name.replace(/\.md$/, '')
      .replace(/\d+-/, '')
  }

  static _extractDate (name) {
    const millis = /(\d+)-/.exec(name)[1]
    return new Date(parseInt(millis))
  }

  constructor (nodeOrBlob) {
    this.sha = nodeOrBlob.sha
  }
}

export default Post
