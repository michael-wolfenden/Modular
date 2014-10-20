'use strict';

module.exports =
/*@ngInject*/
function configure($provide) {
	$provide.decorator('$exceptionHandler', require('./extendExceptionHandler'));
};