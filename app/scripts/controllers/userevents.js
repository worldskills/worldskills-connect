'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UsereventsCtrl
 * @description
 * # UsereventsCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserEventsCtrl', function ($scope, Statuses, User, WSAlert) {
  	$scope.statuses = Statuses;
  	$scope.loading.userevents = {};
  	$scope.STATUS = Statuses.status();

  	$scope.setAttendance = function(eventId, status, e){        
        e.preventDefault();
        //e.stopPropagation(); 
        
  		$scope.loading.userevents[eventId] = true;

  		User.setAttendance(eventId, status).then(function(res){
  			//set status to UI  		

  			if(typeof User.subscriptions[eventId] == 'undefined') //init
  				User.subscriptions[eventId] = {};
  			
  			User.subscriptions[eventId].status = res.status;
  			$scope.profile.subscriptions[eventId].status = res.status;
  			$scope.loading.userevents[eventId] = false;
  		},
  		function(error){
  			WSAlert.danger(error);
  			$scope.loading.userevents[eventId] = false;
  		});
  	};


  })
  .directive('userevents', function(){
  return {
    restrict: 'E',    
    replace: true,
    templateUrl: 'views/directive.user-events.html'    
  }
});
