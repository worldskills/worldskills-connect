'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('SignupCtrl', function ($scope, SIGNUP_URL) {
  	$scope.SIGNUP_URL = SIGNUP_URL;
    
  });
