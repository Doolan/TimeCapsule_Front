(function () {
    var app = angular.module('TimeCapsule', ['ngRoute','DataManager','ngFileUpload', 'ngImgCrop' ]);

    app.config(["$routeProvider", function ($routeProvider, $routeParams) {
        $routeProvider
            .when('/home', {
                templateUrl: '../views/home.html'
                // no controller needed for home
            })
            .when('/dashboard', {
                templateUrl: '../views/dashboard.html'
            })
            .when('/capsule/:location', {
                templateUrl: '../views/capsule.html'
            })
            .when('/upload', {
                templateUrl: '../views/imageUpload.html'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);
    app.exports = app;
})();
