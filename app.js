/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var stripAnsi = require('strip-ansi');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function(stats) {
	if (stats.hasErrors() || stats.hasWarnings()) {
		return browserSync.sockets.emit('fullscreen:message', {
			title: 'Webpack Error:',
			body: stripAnsi(stats.toString()),
			timeout: 100000,
		});
	}
	browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
	logLevel: 'debug',
	proxy: 'localhost:3000',
	files: ['assets/**'],
	serveStatic: ['assets'],
	rewriteRules: [
		{
			match: new RegExp('osb-www-events-theme/css/main.css'),
			fn: function() {
				return 'dist/styles.css';
			},
		},
	],
});
