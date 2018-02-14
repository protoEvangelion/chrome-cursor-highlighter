'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [new ProgressBarPlugin(), new ExtractTextPlugin('styles.css')],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: opts => {
                  return root => {
                    root.walkRules(rule => {
                      rule.walkDecls(decl => {
                        decl.value = decl.value + ' !important'
                        console.log(decl.value)
                      })
                    })
                  }
                },
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },

  stats: {
    colors: true,
  },

  devtool: 'source-map',
}
