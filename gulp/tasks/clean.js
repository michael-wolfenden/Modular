'use strict';

var gulp = require('gulp');
var del  = require('del');
var log  = require('../log');
var pkg  = require('../../package.json');

module.exports = gulp.task('clean', function (cb) {
	log.task('== Cleaning ==');
	
	del([
		pkg.paths.destination, 
		pkg.paths.tmp
	], cb);
});