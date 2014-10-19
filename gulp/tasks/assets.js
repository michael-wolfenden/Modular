'use strict';

var gulp = require('gulp');
var log  = require('../log');
var pkg  = require('../../package.json');

module.exports = gulp.task('assets', function () {
	var assetsDestination = pkg.paths.destination + '/assets';

	log.task('== Assets ==');

	return gulp.src(pkg.paths.assets)
		.pipe(gulp.dest(assetsDestination));
});