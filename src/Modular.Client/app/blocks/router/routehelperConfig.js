'use strict';

module.exports =
/*@ngInject*/
function routehelperConfig() {
    this.config = {
        // These are the properties we need to set
        // $routeProvider: undefined
        // docTitle: ''
        // resolveAlways: {ready: function(){ } }
    };

    this.$get = function () {
        return {
            config: this.config
        };
    };
};