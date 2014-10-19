'use strict';

module.exports =
/* @ngInject */
function toastrConfig(toastr) {
	toastr.options.timeOut = 4000;
	toastr.options.positionClass = 'toast-bottom-right';
};