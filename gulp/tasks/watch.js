'use strict';

var gulp  = require('gulp');
var watch = require('gulp-watch');
var log   = require('../log');
var pkg   = require('../../package.json');

module.exports = gulp.task('watch', function () {
	log.task('== Watch ==');

	watch(pkg.paths.templates, function() {
		log.watch('== Templates Watch ==');
    	gulp.start('templates-watch');
	});

	watch(pkg.paths.js, function() {
    	log.watch('== Site Scripts Watch ==');
    	gulp.start('site-scripts-watch');
	});

	watch(pkg.paths.less, function() {
    	log.watch('== Site Styles Watch ==');
    	gulp.start('site-styles-watch');
	});	

	watch(pkg.paths.assets, function() {
    	log.watch('== Assets Watch ==');
    	gulp.start('assets');
	});

	watch(pkg.paths.images, function() {
    	log.watch('== Images Watch ==');
    	gulp.start('images');
	});

	watch(pkg.paths.index, function() {
    	log.watch('== Index Watch ==');
    	gulp.start('index');
	});	
});
