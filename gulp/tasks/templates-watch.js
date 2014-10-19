'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('templates-watch', function () {
	runSequence(
		'templates',
		'site-scripts',
		'index'
	);
});