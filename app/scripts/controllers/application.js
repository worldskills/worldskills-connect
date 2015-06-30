'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('ApplicationCtrl', function ($scope, $state, auth, WSAlert, User) {

    $scope.auth = auth;
    $scope.user = User;
    
    $scope.logout = function (e) {
        auth.logout();
    };
    
    $scope.$on('$stateChangeStart', function () {
        WSAlert.clear();
    });        

  });
