/**
 * Created by Steven on 2/20/2016.
 */
angular.module('TimeCapsule')
    .controller('landingController', function ($scope){
        $scope.scrollDown = function() {
            $('html, body').animate({
                scrollTop: $("#about").offset().top
            }, 1000);
        }
    });