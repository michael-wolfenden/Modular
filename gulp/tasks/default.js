'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('default', function () {
	runSequence(
		'clean',
		'templates', // site-scripts relies on generated templates
		['lint', 'images', 'assets', 'site-styles', 'vendor-scripts', 'site-scripts'],
		'index',
		'watch'
	);
});