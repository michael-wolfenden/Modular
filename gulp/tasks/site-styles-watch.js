'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var log          = require('../log');

module.exports = gulp.task('site-styles-watch', function () {
	runSequence(
		'site-styles',
		'index'
	);
});