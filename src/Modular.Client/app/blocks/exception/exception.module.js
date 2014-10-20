'use strict';

module.exports = require('angular')
	.module('blocks.exception', [])
	.factory('exception', require('./exception'))
	.provider('exceptionHandler', require('./exceptionHandlerProvider'))
	.config(require('./config.exception'));

