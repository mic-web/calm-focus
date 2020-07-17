const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const paths = require('./paths')

const distDir = path.resolve(__dirname, paths.distDir)
const srcDir = path.resolve(__dirname, paths.srcDir)
const workerFilePath = path.resolve(__dirname, paths.srcDir, paths.workerDir, paths.timerWorkerFileName)

const appConfig = {
  context: srcDir,
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: '[name].js',
    path: distDir,
    globalObject: 'this',
  },
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
    new CleanWebpackPlugin({
      // Exclude .git folder which is used for publishing to github pages
      cleanOnceBeforeBuildPatterns: [path.resolve(distDir, '*'), `!${path.resolve(distDir, '.git')}`],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.resolve(__dirname, paths.srcDir, 'favicon.ico'),
      title: 'Progressive Web App',
    }),
    new CopyPlugin([
      {
        from: workerFilePath,
        to: path.resolve(__dirname, paths.distDir, paths.timerWorkerFileName),
      },
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}

const workerConfig = {
  entry: workerFilePath,
  mode: 'production',
  target: 'webworker',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: distDir,
    filename: paths.timerWorkerFileName,
  },
}

module.exports = {
  app: appConfig,
  worker: workerConfig,
}
