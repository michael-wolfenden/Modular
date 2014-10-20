'use strict';

module.exports =
/*@ngInject*/
function routehelper($location, $rootScope, $route, logger, routehelperConfig) {
    var handlingRouteChangeError = false;
    var routeCounts = {
        errors: 0,
        changes: 0
    };
    var routes = [];
    var $routeProvider = routehelperConfig.config.$routeProvider;

    var service = {
        configureRoutes: configureRoutes,
        getRoutes: getRoutes,
        routeCounts: routeCounts
    };

    init();

    return service;
    ///////////////

    function init() {
        handleRoutingErrors();
        updateDocTitle();
    }

    function updateDocTitle() {
        $rootScope.$on('$routeChangeSuccess',
            function (event, current) {
                routeCounts.changes+=1;
                handlingRouteChangeError = false;
                var title = routehelperConfig.config.docTitle + ' ' + (current.title || '');
                $rootScope.title = title; // data bind to <title>
            }
        );
    }
    
    function configureRoutes(routes) {
        routes.forEach(function (route) {
            route.config.resolve =
                angular.extend(route.config.resolve || {}, routehelperConfig.config.resolveAlways);
            $routeProvider.when(route.url, route.config);
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$routeChangeError',
            function (event, current, previous, rejection) {
                if (handlingRouteChangeError) {
                    return;
                }
                routeCounts.errors+=1;
                handlingRouteChangeError = true;
                var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                    'unknown target';
                var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                logger.warning(msg, [current]);
                $location.path('/');
            }
        );
    }

    function getRoutes() {
        for (var prop in $route.routes) {
            if ($route.routes.hasOwnProperty(prop)) {
                var route = $route.routes[prop];
                var isRoute = !!route.title;
                if (isRoute) {
                    routes.push(route);
                }
            }
        }
        return routes;
    }
};