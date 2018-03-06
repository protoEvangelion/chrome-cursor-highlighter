'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const plugins = [
	new CleanWebpackPlugin(['src/dist']),
	new ExtractTextPlugin('styles.css'),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(process.env.NODE_ENV),
	}),
];

module.exports = {
	entry: path.join(__dirname, 'src/js/index.js'),

	output: {
		path: path.join(__dirname, 'src/dist'),
		filename: 'bundle.js',
	},

	plugins: plugins,

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
