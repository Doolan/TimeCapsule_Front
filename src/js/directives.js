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
//}).directive('pictureView', function(){

})
    .directive('imageUpload', function(){
        return {
            restrict: 'E',
            templateUrl: '../../views/imageUpload.html'
        }
    })


    .directive('hoverIconCard', function(){
    return{
        restrict:'E',
        templateUrl:'../../views/subComponents/hoverIconCard.html',
        scope: {
            iconexpression: '=',//two way binding
            content: '@',
            hoverContent:'@',
            callfunction:'&'
        }
    }
})
    .directive('cityInput', function(){
        return {
            restrict:'E',
            templateUrl:'../../views/subComponents/citySelectPopup.html'
        }
    });

