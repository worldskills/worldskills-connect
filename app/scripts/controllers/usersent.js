'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UsersentCtrl
 * @description
 * # UsersentCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserSentCtrl', function ($scope, User, $q, WSAlert) {

  	$scope.loading.sentItem = {};

  	$scope.init = function(){
  		$scope.loading.sent = true;

		User.getSent().then(function(){
			$scope.loading.sent = false;
		},
		function(error){
			WSAlert.danger(error);
			$scope.loading.sent = false;
		});
  	};

  	$scope.cancelRequest = function(connectionId, $index){
  		$scope.loading.sentItem[connectionId] = true;

  		User.cancelRequest(connectionId).then(function(result){
  			User.data.sent.connections.splice($index, 1);
        	User.data.sent.total_count -= 1;
        	$scope.loading.sentItem[connectionId] = false;
  		},
  		function(error){
  			WSAlert.danger(error);
  			$scope.loading.sentItem[connectionId] = false;
  		});
  	};

  	//after User has loaded
  	$q.when(User.data.promise).then(function(){
  		$scope.init();
  	});  	
  });
