'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('EventsCtrl', function ($scope, $http, WSAlert, User, Statuses) {
  	//  .controller('PersonCtrl', function ($scope, Auth, $timeout, $modal, $interval, $upload, API_IMAGES, Person, $rootScope, $http, $q, API_PEOPLE, APP_ROLES, $stateParams, $state, $translate, WSAlert, Language) {  	  	
  		  		      
  		$scope.loading.events = {};
      $scope.STATUS = Statuses.status();
      $scope.email = 'testing';

  		$scope.setAttendance = function(eventId, status, e){        
        e.preventDefault();
        //e.stopPropagation(); 
        
  			$scope.loading.events[eventId] = true;

  			User.setAttendance(eventId, status).then(function(res){
  				//set status to UI  		
  				if(typeof User.subscriptions[eventId] == 'undefined') //init
  					User.subscriptions[eventId] = {};
  				
  				User.subscriptions[eventId].status = res.status;
  				$scope.loading.events[eventId] = false;
  			},
  			function(error){
  				WSAlert.danger(error);
  				$scope.loading.events[eventId] = false;
  			});
  		};
  })
.directive('events', function(){
  return {
    restrict: 'E',    
    replace: true,
    templateUrl: 'views/directive.events.html'    
  }
});
