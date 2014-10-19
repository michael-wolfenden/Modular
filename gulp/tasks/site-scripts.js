'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var rev        = require('gulp-rev');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngannotate = require('browserify-ngannotate');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var del        = require('del');
var _          = require('lodash');
var log        = require('../log');
var pkg        = require('../../package.json');

var browserified = function (filename) {
    var b = browserify({
        entries: [filename],
        debug: true
    });

    b.transform(ngannotate);

    log.task('- excluding from bundle:', pkg.vendorPackages);

    _(pkg.vendorPackages).forEach(function(vendorShim) {
        b.external(vendorShim);
    });

    return b.bundle();
};

module.exports = gulp.task('site-scripts', function () {
    var jsDestination = pkg.paths.destination + '/js';

    // eg. site.js -> site*
    var allSiteJsFiles = jsDestination + '/' + pkg.filenames.siteJs.split('.')[0] + '*';

    // delete old revisions
    del(allSiteJsFiles);

    log.task('== Site Scripts ==');

    return browserified(pkg.paths.mainJs) 
        .on('error', log.error)
        .pipe(source(pkg.filenames.siteJs))
        .pipe(buffer()) 
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsDestination))
        .pipe(rev.manifest())
        .pipe(concat(pkg.filenames.siteJsMainfest))
        .pipe(gulp.dest(pkg.paths.destination));
});