angular.module('TimeCapsule')
    .directive('mainNavigation', function () {
        return {
            restrict: 'E',
            templateUrl: '../../views/nav.html'
        };

    }).directive('landingPage', function () {
    return {
        restrict: 'E',
        templateUrl: '../../views/landingPage.html'
    };
}).directive('about', function () {
        return {
            restrict: 'E',
            templateUrl: '../../views/about.html'
        };
    }
).directive('login', function () {
        return {
            scope:false,
            restrict: 'E',
            templateUrl: '../../views/login.html'
        };
    }
);

