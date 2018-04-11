'use strict';

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const plugins = [
	// new CleanWebpackPlugin(['dist']),
	new ExtractTextPlugin('styles.css'),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(process.env.NODE_ENV),
	}),
];

const devPlugins = [
	new BrowserSyncPlugin({
		// browse to http://localhost:3000/ during development,
		// ./public directory is being served
		host: 'localhost',
		logLevel: 'debug',
		proxy: 'http://localhost:3000',
		files: ['dist/*'],
		serveStatic: ['dist'],
		rewriteRules: [
			{
				match: /osb-www-events-theme\/css\/main.css/i,
				fn: function() {
					return 'styles.css';
				},
			},
		],
		middleware: function(req, res, next) {
			if (
				req.url.includes(
					'/html/css/main.css?browserId=other&themeId=osbwwwevents_WAR_osbwwweventstheme'
				)
			) {
				console.log('found it ==========================', req.url);
				req.url = 'http://localhost:3001/styles.css';
			} else if (req.url === '/how-it-works') {
				// req.url = '/pages/how-it-works.html';
			}
			return next();
		},
		port: 3001,
	}),
];

if (process.env.NODE_ENV === 'development') {
	plugins.push(...devPlugins);
}

module.exports = {
	entry: path.join(__dirname, 'src/js/index.js'),

	output: {
		path: path.join(__dirname, 'dist'),
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
											// if (rule.selector.includes('.aui')) {
											rule.walkDecls(decl => {
												decl.value = decl.value + ' !important';
											});
											// }
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
