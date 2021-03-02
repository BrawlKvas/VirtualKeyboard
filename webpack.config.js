/*eslint-disable*/
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  // resolve: {
  //   alias: {
  //     '@styles': path.resolve(__dirname, 'src/styles'),
  //     '@img': path.resolve(__dirname, 'src/public/img'),
  //     '@modules': path.resolve(__dirname, 'src/app/modules'),
  //   }
  // },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|webp)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      }
    ]
  }
}