'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('AdminCtrl', function ($scope) {
    $scope.title = "Overview";
    $scope.loading = {};
  });
