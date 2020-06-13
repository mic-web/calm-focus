const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = [
  common.worker,
  merge(common.app, {
    mode: 'production',
  }),
]
