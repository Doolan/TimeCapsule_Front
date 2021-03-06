/**
 * Created by Steven on 2/20/2016.
 */
angular.module('TimeCapsule')
    .controller('landingController', function ($scope, $location) {
        $scope.scrollDown = function () {
            $('html, body').animate({
                scrollTop: $("#about").offset().top
            }, 1000);
        };

        $scope.launchLogin = function () {
            $('#login-modal')
                .modal('show').modal('refresh')//re-centers
                //.modal('attach events', '#login-modal .remove', 'hide')
                .modal({
                    closable: false,
                    onDeny: function () {
                        return true;
                    },
                    onApprove: function () {
                        //$scope.loginConfirm;
                        return true;
                    }

                });
            $('#login-modal .form .message').hide();

            $('#login-modal .ui.form')
                .form({
                    fields: {
                        email: {
                            identifier: 'email',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter your e-mail'
                                },
                                {
                                    type: 'email',
                                    prompt: 'Please enter a valid e-mail'
                                }
                            ]
                        },
                        password: {
                            identifier: 'password',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please enter your password'
                                },
                                {
                                    type: 'length[6]',
                                    prompt: 'Your password must be at least 6 characters'
                                }
                            ]
                        }
                    }
                });
        };

        $scope.loginConfirm = function () {
            if (!$('#login-modal .ui.form').form('validate form')) {
                $('#login-modal .form .message').show();
                return false;
            }
            $location.path('/dashboard/');
            //$scope.redirectFunction();
            //$location.redirect('/dashboard/');
            //Redirect
            return true;
        };



    })
    .controller('loginController', function ($scope, $location) {
        $scope.redirectFunction = function () {
            if (!$('#login-modal .ui.form').form('validate form')) {
                $('#login-modal .form .message').show();
                return false;
            } else {
                $('#login-modal')
                    .modal('hide');
                //console.log("I was hit");
                $location.path('/dashboard/');
                return true;
            }
        }
    })
    .controller('dashboardController', function ($scope, $location, CityService) {
        $scope.emptyfunc = function () {
        };
        $scope.redirectFunction = function (location) {
            console.log(location);
            $location.url(location + "/Chicago");
        };
        $scope.launchUpload = function(){
            $location.path('/upload');
        };


        $scope.launchLogin = function () {
            $('#city-modal')
                .modal('show').modal('refresh')//re-centers
                //.modal('attach events', '#login-modal .remove', 'hide')
                .modal({
                    closable: false,
                    onDeny: function () {
                        return true;
                    },
                    onApprove: function () {
                        //$scope.loginConfirm;
                        return true;
                    }

                });
            $('#city-modal .form .message').hide();

            $('#city-modal .ui.form')
                .form({
                    fields: {
                        magicsuggest: {
                            identifier: 'input',
                            rules: [
                                {
                                    type: 'empty',
                                    prompt: 'Please select a city'
                                }
                            ]
                        }
                    }
                });
        };

        $scope.exploreRandom = function(){
            CityService.getCitesWithData(function(data){
                $location.path('/capsule/' + data[(Math.floor((Math.random() * data.length)))]);
            });
        };

    })
    .controller('capsuleController', function ($scope, PhotoService, $routeParams, $location) {
        //$scope.cityName = "Chicago";
        //$scope.contact = Contact.get({id: parseInt($routeParams.id, 10)});
        $scope.cityName = $routeParams.location ? $routeParams.location : "Chicago";

        $scope.cityImages = [{
            "Id": -1,
            "Title": "Chicago Auto Show",
            "Description": "The Chicago Auto Show is not only the nation's largest car show, it is also the longest running. The first show was held in the Chicago Coliseum in 1901. It received relatively little attention in the local press. Within a few short years, the show grew into a major tourist attraction. These photos are from the 1909 show.",
            "Path": "../images/Chicago/12716328_10152896329597465_1232418463979988700_o.jpg",
            "Location": "",
            "OwnerId": "",
            "DateUploaded": "",
            "Year": 1909,
            "Month": -1
        }];

        $('.special.cards .image').dimmer({
            on: 'hover'
        });

        $scope.jumpToDash = function(){
            $location.path('/dashboard');
        };

        PhotoService.queryImagesForCity($scope.cityName, function (data) {
            $scope.cityImages = data;
        });
        //$scope.masonryStart = function(){
        //     console.log("hit mem");
        $scope.$grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            //columnWidth: '.grid-sizer'
        });

    })
    .controller('inputController', function ($scope, $location, CityService) {
        $scope.array = [];
        CityService.getCitesWithData(function (data) {
            $scope.array = data;
            msInit();
        });
        var msInit = function () {
            $scope.mgsug = $('#magicsuggest').magicSuggest({
                data: $scope.array,
                maxSelection: 1,
                allowFreeEntries: false//disallow free entries

                //
            });
        };

        $scope.travel = function () {
            //console.log($scope.mgsug.getValue());
            var location = $scope.mgsug.getValue()[0];
            $('#city-modal')
                .modal('hide');

            //$location.path('/capsule')
            $location.url('/capsule/' + location);
        };//add string to path var
    })
    .controller('imageUploadController', ['$scope',  'Upload', '$timeout','CityService', '$location', function ($scope, Upload, $timeout, CityService, $location) {
        $scope.phase={
            upload:true,
            crop:false,
            submit:false
        };

        $scope.array =[];

        CityService.getCitesWithData(function (data) {
            $scope.array = data;
            msInit();
        });
        var msInit = function () {
            $scope.mgsug = $('#magicSuggestOpen').magicSuggest({
                data: $scope.array,
                maxSelection: 1,
                allowFreeEntries: true//allow free entries and new cities
            });
        };

        $scope.imgData = {
            title: "",
           // City: "",
            month:"",
            year:"",
            description:"",
            ownerId:1,
            path:"  ",

        };

        $scope.upload = function (dataUrl) {
            $scope.imgData.city = $scope.mgsug.getValue()[0];
            $scope.imgData.file = Upload.dataUrltoBlob(dataUrl);
            console.log($scope.imgData);
            $location.path('/dashboard');
            //Upload.upload({
            //    url: '',
            //    data: $scope.imgData,
            //}).then(function (response) {
            //    $timeout(function () {
            //        $scope.result = response.data;
            //    });
            //}, function (response) {
            //   // if (response.status > 0) $scope.errorMsg = response.status
            //     //   + ': ' + response.data;
            //    $location.path('/dashboard');
            //}, function (evt) {
            //    //$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            //    $location.path('/dashboard');
            //});
        }
    }]);
