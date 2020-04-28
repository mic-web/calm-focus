const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const vars = require('./common-vars')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, vars.distDir),
    hot: true,
    port: 3000,
  },
})
