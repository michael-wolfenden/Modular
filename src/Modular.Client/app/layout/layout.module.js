'use strict';

module.exports = require('angular')
	.module('app.layout', [])
	.constant('toastr', require('toastr'))
	.controller('Shell', require('./shell'))
	.controller('Sidebar', require('./sidebar'));