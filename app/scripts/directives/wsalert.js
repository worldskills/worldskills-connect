'use strict';

/**
 * @ngdoc directive
 * @name connectApp.directive:WSAlert
 * @description
 * # WSAlert
 */
angular.module('connectApp')
  .directive('alerts', function (WSAlert) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/wsalert.html',
      link: function($scope, element, attrs) {
      	$scope.WSAlert = WSAlert;
      	$scope.close = function(index){
      		WSAlert.messages.splice(index, 1);
      	};
      	WSAlert.setAllDisplayed();        
      }
    };
  });
