const path = require('path')

const CWD = process.cwd()

module.exports = {
  includePaths: [
    path.resolve(CWD, 'src/scss')
  ]
}
