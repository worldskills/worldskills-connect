'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserinboxCtrl
 * @description
 * # UserinboxCtrl
 * Controller of the connectApp
 */
angular.module('connectApp') 
  .controller('UserInboxCtrl', function ($q, $scope, User, WSAlert) {  	
  	$scope.loading.inbox = false;
    $scope.loading.inboxItem = {};

    $scope.refresh = function(){
      $scope.loading.inbox = true;
      $q.when(User.data.promise).then(function(){
        User.inbox().then(function(res){         
          //refreshed
          $scope.loading.inbox = false;
        },
        function(error){
          WSAlert.danger(error);
          $scope.loading.inbox = false;
        });
      });
    };

    $scope.refresh();

  	$scope.actionConnection = function(connectionId, accepted, $index){
  		$scope.loading.inboxItem[connectionId] = true;

  		User.actionConnection(connectionId, accepted).then(function(res){        
  			if(accepted)
  				WSAlert.success("Connection accepted");  			  			
  			else WSAlert.success("Connection denied");

  			User.data.inbox.connections.splice($index, 1);
        User.data.inbox.total_count -= 1;

  			$scope.loading.inboxItem[connectionId] = false;
  		},
  		function(error){
  			WSAlert.danger(error);
  			$scope.loading.inboxItem[connectionId] = false;
  		});
  	};
  });
