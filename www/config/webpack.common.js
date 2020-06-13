const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const paths = require('./paths')

const distDir = path.resolve(__dirname, paths.distDir)
const srcDir = path.resolve(__dirname, paths.srcDir)
const wasmDir = path.resolve(__dirname, paths.srcDir, paths.wasmDir)
const workerFilePath = path.resolve(__dirname, paths.workerDir, paths.wasmWorkerFileName)

const appConfig = {
  context: srcDir,
  entry: './index.tsx',
  output: {
    filename: '[name].js',
    path: distDir,
    globalObject: 'this',
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
    ]),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
}

const workerConfig = {
  entry: workerFilePath,
  target: 'webworker',
  resolve: {
    extensions: ['.js', '.wasm'],
  },
  output: {
    path: distDir,
    filename: paths.wasmWorkerFileName,
  },
}

module.exports = {
  app: appConfig,
  worker: workerConfig,
}
