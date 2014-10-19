'use strict';

var gutil = require('gulp-util');

var log = function (color, args) {
  	gutil.log(gutil.colors[color].apply(null, args));
};

module.exports.task = function() {
	log('yellow', Array.prototype.slice.call(arguments));
};

module.exports.error = function() {
	log('red', Array.prototype.slice.call(arguments));
};

module.exports.watch = function() {
	log('green', Array.prototype.slice.call(arguments));
};