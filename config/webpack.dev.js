const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = [
  merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, paths.distDir),
      hot: true,
      port: 3000,
      disableHostCheck: true,
      host: '0.0.0.0',
      https: true,
    },
  }),
]
