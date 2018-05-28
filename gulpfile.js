'use strict'

var gulp = require('gulp')
var postcss = require('gulp-postcss')
var sass = require('gulp-sass')
var safeImportant = require('postcss-safe-important')

gulp.task('default', ['sass'])

gulp.task('sass', function() {
	return gulp
		.src('./src/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([safeImportant]))
		.pipe(gulp.dest('./dist'))
})

gulp.task('sass:watch', function() {
	gulp.start('sass')

	gulp.watch('./src/styles.scss', ['sass'])
})
