'use strict';

module.exports =
/*@ngInject*/
function exceptionHandlerProvider() {
	this.config = {
		appErrorPrefix: undefined
	};

	this.configure = function (appErrorPrefix) {
		this.config.appErrorPrefix = appErrorPrefix;
	};

	this.$get = function () {
		return {
			config: this.config
		};
	};
};