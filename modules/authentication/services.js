'use strict';
 
angular.module('Authentication')
 
.factory('AuthenticationService',
    ['$http', '$cookies', '$rootScope', '$timeout',
    function ($http, $cookies, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var response = { success: username === 'test' && password === 'test' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);


        };
 
        service.SetCredentials = function (username, password) {
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: password
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + username;
            $cookies.putObject('globals', $rootScope.globals);
        };
 
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
 
        return service;
    }]);