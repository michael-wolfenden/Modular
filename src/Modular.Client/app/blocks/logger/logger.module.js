'use strict';

module.exports = require('angular')
	.module('blocks.logger', [])
	.factory('logger', require('./logger'));