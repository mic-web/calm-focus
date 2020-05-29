const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const paths = require('./paths')

module.exports = {
  context: path.resolve(__dirname, paths.srcDir),
  entry: './index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, paths.distDir),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { config: { path: path.resolve(__dirname, './postcss.config.js') } } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.resolve(__dirname, paths.srcDir, 'favicon.ico'),
      title: 'Progressive Web App',
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, paths.publicDir),
        to: path.resolve(__dirname, paths.distDir),
      },
      path.resolve(__dirname, paths.srcDir, 'manifest.webmanifest'),
      path.resolve(__dirname, paths.srcDir, 'services', 'timer.worker.js'),
    ]),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
}
