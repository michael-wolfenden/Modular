'use strict';

var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var log      = require('../log');
var pkg      = require('../../package.json');

module.exports = gulp.task('images', function () {
	var imagesDestination = pkg.paths.destination + '/assets/images';

	log.task('== Images ==');

	return gulp.src(pkg.paths.images)
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(imagesDestination));
});