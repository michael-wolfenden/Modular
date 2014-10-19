'use strict';

var gulp          = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML    = require('gulp-minify-html');
var header        = require('gulp-header');
var log           = require('../log');
var pkg           = require('../../package.json');

module.exports = gulp.task('templates', function () {
	log.task('== Templates ==');

	return gulp.src(pkg.paths.templates)
		.pipe(minifyHTML({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(templateCache({
			standalone: true,
			root: 'app'
		}))
		.pipe(header('module.exports = '))
		.pipe(gulp.dest(pkg.paths.tmp));
});