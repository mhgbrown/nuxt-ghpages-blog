import Remarkable from 'remarkable'
import hljs from 'highlightjs'

class Markdown {
  constructor () {
    this.renderer = new Remarkable('full', {
      html: true,
      typographer: true,
      // https://github.com/jonschlinkert/remarkable/issues/224
      langPrefix: 'hljs language-',
      highlight (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value
        } catch (err) {}

        return '' // use external default escaping
      }
    })
  }

  toHTML (str) {
    return this.renderer.render(str)
  }
}

export default new Markdown()
