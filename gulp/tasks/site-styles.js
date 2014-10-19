'use strict';

var gulp         = require('gulp');
var del          = require('del');
var less         = require('gulp-less');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var rev          = require('gulp-rev');
var concat       = require('gulp-concat');
var autoprefixer = require('autoprefixer-core');
var csswring     = require('csswring');
var log          = require('../log');
var pkg          = require('../../package.json');

module.exports = gulp.task('site-styles', function () {
    var cssDestination = pkg.paths.destination + '/css';

    // eg. site.css -> site*
    var allSiteCssFiles = cssDestination + '/' + pkg.filenames.siteCss.split('.')[0] + '*';

    // delete old revisions
    del(allSiteCssFiles);

    log.task('== Site Styles ==');

    var processors = [
        autoprefixer,
        csswring
    ];

    return gulp.src(pkg.paths.mainLess)
        .pipe(sourcemaps.init())
        .pipe(less().on('error', log.error))
        .pipe(postcss(processors))
        .pipe(concat(pkg.filenames.siteCss))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestination))
        .pipe(rev.manifest())
        .pipe(concat(pkg.filenames.siteCssMainfest))
        .pipe(gulp.dest(pkg.paths.destination));
});
