'use strict';

/**
 * @ngdoc function
 * @name worldSkillsAngularSkeletonApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the worldSkillsAngularSkeletonApp
 */
angular.module('connectApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
