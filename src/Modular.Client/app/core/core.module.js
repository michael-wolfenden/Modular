'use strict';

module.exports = require('angular')
	.module('app.core', [
		require('../blocks/logger/logger.module').name,
		require('../blocks/router/router.module').name
	])
	.constant('toastr', require('toastr'))
	.config(require('./config.toastr'))
	.value('config', require('./config.application'));
