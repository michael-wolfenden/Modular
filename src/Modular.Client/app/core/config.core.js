'use strict';

module.exports =
/* @ngInject */
function configure($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider, config) {
	// turn debugging off/on (no info or warn)
	if ($logProvider.debugEnabled) {
		$logProvider.debugEnabled(true);
	}

	// Configure the common route provider
	routehelperConfigProvider.config.$routeProvider = $routeProvider;
	routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
	var resolveAlways = { /* @ngInject */
		ready: function (dataservice) {
			return dataservice.ready();
		}
		// ready: ['dataservice', function (dataservice) {
		//    return dataservice.ready();
		// }]
	};
	routehelperConfigProvider.config.resolveAlways = resolveAlways;

	// Configure the common exception handler
	exceptionHandlerProvider.configure(config.appErrorPrefix);
};