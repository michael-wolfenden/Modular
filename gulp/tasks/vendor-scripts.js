'use strict';

var gulp       = require('gulp');
var del        = require('del');
var browserify = require('browserify');
var rev        = require('gulp-rev');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var _          = require('lodash');
var log        = require('../log');
var pkg        = require('../../package.json');

var browserified = function (filename) {
    var b = browserify({
        entries: [filename],
        debug: true
    });

    log.task('-', pkg.vendorPackages);

    _(pkg.vendorPackages).forEach(function(vendorShim) {
        b.require(vendorShim);
    });

    return b.bundle();
};

module.exports = gulp.task('vendor-scripts', function () {
    var jsDestination = pkg.paths.destination + '/js';

    // eg. vendor.js -> vendor*
    var allVendorJsFiles = jsDestination + '/' + pkg.filenames.vendorJs.split('.')[0] + '*';

    // delete old revisions
    del(allVendorJsFiles);

    log.task('== Vendor Scripts ==');

    return browserified('./gulp/empty_file_to_start_pipe.js')
        .on('error', log.error)
        .pipe(source(pkg.filenames.vendorJs))
        .pipe(buffer()) 
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsDestination))
        .pipe(rev.manifest())
        .pipe(concat(pkg.filenames.vendorJsMainfest))
        .pipe(gulp.dest(pkg.paths.destination));
});