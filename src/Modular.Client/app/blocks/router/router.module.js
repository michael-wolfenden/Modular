'use strict';

require('angular-route');

module.exports = require('angular')
	.module('blocks.router', [
		'ngRoute'
	])
	.provider('routehelperConfig', require('./routehelperConfig'))
	.factory('routehelper', require('./routehelper'));