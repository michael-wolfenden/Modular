'use strict';

module.exports = require('angular')
	.module('app.core', [
		require('../blocks/logger/logger.module').name,
		require('../blocks/router/router.module').name,
		require('../blocks/exception/exception.module').name
	])
	.constant('config', require('./config.application'))
	.config(require('./config.core'))
	.constant('toastr', require('toastr'))
	.config(require('./config.toastr'));
