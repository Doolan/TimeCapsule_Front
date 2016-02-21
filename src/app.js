(function () {
    var app = angular.module('TimeCapsule', ['ngRoute','DataManager']);

    app.config(["$routeProvider", function ($routeProvider, $routeParams) {
        $routeProvider
            .when('/home', {
                templateUrl: '../views/home.html'
                // no controller needed for home
            })
            .when('/dashboard', {
                templateUrl: '../views/dashboard.html'
            })
            .when('/capsule', {
                templateUrl: '../views/capsule.html'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);
    app.exports = app;
})();
