'use strict';

var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var log     = require('../log');
var pkg     = require('../../package.json');

module.exports = gulp.task('lint', function () {
	log.task('== Linting ==');
	
	return gulp.src(pkg.paths.js)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
		//.pipe(jshint.reporter('fail'));
});