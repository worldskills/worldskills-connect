'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
