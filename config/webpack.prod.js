const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = [
  merge(common.app, {
    mode: 'production',
  }),
  common.worker,
]
