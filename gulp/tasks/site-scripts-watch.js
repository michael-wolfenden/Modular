'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('site-scripts-watch', function () {
	runSequence(
		['lint', 'site-scripts'],
		'index'
	);
});