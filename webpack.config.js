'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	plugins: [
		new ProgressBarPlugin(),
		new ExtractTextPlugin('styles.css'),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		}),
	],

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
								plugins: () => {
									return root => {
										root.walkRules(rule => {
											if (rule.selector.includes('.aui')) {
												rule.walkDecls(decl => {
													decl.value = decl.value + ' !important';
												});
											}
										});
									};
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
};
