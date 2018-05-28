'use strict'

const gulp = require('gulp')
const fs = require('fs')
const inject = require('gulp-inject-string')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const safeImportant = require('postcss-safe-important')

gulp.task('default', ['inject'])

gulp.task('sass', () =>
	gulp
		.src('./src/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([safeImportant]))
		.pipe(gulp.dest('./dist'))
)

gulp.task('inject', ['sass'], () => {
	const cssString = fs.readFileSync('./dist/styles.css')
	const jsString = fs.readFileSync('./src/index.js')

	gulp
		.src('./src/tamperMonkeyTemplate.js')
		.pipe(inject.after('/* inject:css */', `\n${cssString}`))
		.pipe(inject.after('/* inject:js */', `\n${jsString}`))
		.pipe(gulp.dest('./dist'))
})

gulp.task('watch', () => {
	gulp.start('inject')

	gulp.watch('./src/*', ['inject'])
})
