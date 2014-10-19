'use strict';

require('string-format');

var gulp       = require('gulp');
var replace    = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');
var log        = require('../log');
var pkg        = require('../../package.json');

var getMainfestFilename = function(manifestFileName, filename) {
	var mainfestPath = '../../{0}/{1}'.format(pkg.paths.destination, manifestFileName);
	return requireUncached(mainfestPath)[filename];
};

var requireUncached = function(module){
    delete require.cache[require.resolve(module)];
    return require(module);
};

module.exports = gulp.task('index', function () {

	log.task('== Index ==');

	var siteCssRevFilename = getMainfestFilename(pkg.filenames.siteCssMainfest, pkg.filenames.siteCss); 
	var siteJsRevFilename = getMainfestFilename(pkg.filenames.siteJsMainfest, pkg.filenames.siteJs); 
	var vendorJsRevFilename = getMainfestFilename(pkg.filenames.vendorJsMainfest, pkg.filenames.vendorJs); 

	log.task('-', siteJsRevFilename);
	log.task('-', siteCssRevFilename);
	log.task('-', vendorJsRevFilename);

	return gulp.src(pkg.paths.index)
		.pipe(minifyHTML({
			comments: true,
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(replace('<!--siteCss-->', '<link href="css/{0}" rel="stylesheet"></style>'.format(siteCssRevFilename)))
		.pipe(replace('<!--siteJs-->', '<script src="js/{0}"></script>'.format(siteJsRevFilename)))
		.pipe(replace('<!--vendorJs-->', '<script src="js/{0}"></script>'.format(vendorJsRevFilename)))
		.pipe(gulp.dest(pkg.paths.destination));
});