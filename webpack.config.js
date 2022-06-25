const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  },
  devtool: 'eval-cheap-source-map',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff$/i,
        exclude: /node_modules/,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    host: 'localhost',
    hot: true,
    static: {
      directory: path.join(__dirname, 'bundle'),
      publicPath: '/'
    },
    compress: false,
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}