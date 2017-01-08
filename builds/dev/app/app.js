;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app', ['app.templates', 'ui.router', 'app.dashboard'])
}(window, angular, undefined));

;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app.dashboard', [])
}(window, angular, undefined));

;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app')
        .config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    }
}(window, angular, undefined));

;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);
    DashboardController.$inject = ['dep1', 'dep2'];

    function DashboardController(dep1, dep2) {
        var vm = this;
        console.log(dep1);
        console.log(dep2);
    }
}(window, angular, undefined));

;
(function(window, angular, undefined) {
    angular
        .module('app.dashboard')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider.state("dashboard", {
                url: "/dashboard",
                controller: "DashboardController as dashboard",
                // this is the place where to resolve dynamic template
                templateProvider: function($templateCache) {
                    // simplified, expecting that the cache is filled
                    // there should be some checking... and async $http loading if not found
                    return $templateCache.get('components/dashboard/dashboard.template.html');
                },
                resolve: {
                    dep1: function($q, $timeout) {
                        var defer = $q.defer();
                        $timeout(function() {
                            defer.resolve("1st Dependency Loaded.");
                        }, 2000)
                        return defer.promise;
                    },
                    dep2: function($q, $timeout) {
                        var defer = $q.defer();
                        $timeout(function() {
                            defer.resolve("2nd Dependency Loaded.");
                        }, 2000)
                        return defer.promise;
                    }
                }
            })
        });
}(window, angular, undefined));
