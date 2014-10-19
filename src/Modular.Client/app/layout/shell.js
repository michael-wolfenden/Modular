'use strict';

module.exports =
/*@ngInject*/
function Shell($timeout, config, logger) {
	var vm = this;

	vm.title = config.appTitle;
	vm.busyMessage = 'Please wait ...';
	vm.isBusy = true;
	vm.showSplash = true;

	activate();

	function activate() {
		logger.success(config.appTitle + ' loaded!', null);
		//            Using a resolver on all routes or dataservice.ready in every controller
		//            dataservice.ready().then(function(){
		//                hideSplash();
		//            });
		hideSplash();
	}

	function hideSplash() {
		//Force a 1 second delay so we can see the splash.
		$timeout(function () {
			vm.showSplash = false;
		}, 1000);
	}
};