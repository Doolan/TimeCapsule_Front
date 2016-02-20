/**
 * Created by Steven on 2/20/2016.
 */
angular.module('TimeCapsule')
    .controller('landingController', function ($scope){
        $scope.scrollDown = function() {
            $('html, body').animate({
                scrollTop: $("#about").offset().top
            }, 1000);
        };

        $scope.launchLogin = function(){
            $('#login-modal')
                .modal('show').modal('refresh')//re-centers
                .modal('attach events', '#login-modal .remove', 'hide')
                .modal({
                    closable: false,
                    onDeny:function () {
                        return true;
                    },
                    onApprove: $scope.loginConfirm
                });
            $('#login-modal .form .message').hide();

            $('#login-modal .ui.form')
                .form({
                    fields: {
                        email: {
                            identifier  : 'email',
                            rules: [
                                {
                                    type   : 'empty',
                                    prompt : 'Please enter your e-mail'
                                },
                                {
                                    type   : 'email',
                                    prompt : 'Please enter a valid e-mail'
                                }
                            ]
                        },
                        password: {
                            identifier  : 'password',
                            rules: [
                                {
                                    type   : 'empty',
                                    prompt : 'Please enter your password'
                                },
                                {
                                    type   : 'length[6]',
                                    prompt : 'Your password must be at least 6 characters'
                                }
                            ]
                        }
                    }
                });
        };


        $scope.loginConfirm = function(){
            if (!$('#login-modal .ui.form').form('validate form')) {
                $('#login-modal .form .message').show();
                return false;
            }
            //Redirect
            return true;
        };
    });