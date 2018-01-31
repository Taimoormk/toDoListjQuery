var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob-all');
var PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  entry: './src/js/todo_module.js',
  output: {
    path: `${__dirname}/dist/js`,
    fileName: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new ExtractTextPlugin({
      filename: '../css/styles.css'
    }),
    new PurifyCSSPlugin({
      paths: glo.sync([
        path.join(__dirname, 'dist/index.html'),
        path.join(__dirname, 'src/js/*.js')
      ])
    })
  ]
};