const xss = require('xss');

module.exports = {
  lenient(html) {
    return xss(html, {
      whiteList: {
        iframe: ['src', 'class'],
        style: [],
        link: ['href', 'rel', 'type'],
        ...xss.whiteList
      }
    });
  },
  strict(html) {
    return xss(html, {
      whiteList: {
        p: [],
        span: [],
        code: [],
        b: [],
        i: [],
        li: [],
        ul: [],
        ol: [],
        del: [],
        pre: [],
        strong: [],
        em: [],
        h1: ['id'],
        h2: ['id'],
        h3: ['id'],
        h4: ['id'],
        h5: ['id'],
        h6: ['id'],
        table: [],
        thead: [],
        tbody: [],
        tr: [],
        td: [],
        hr: [],
        blockquote: []
      }
    });
  },
};
