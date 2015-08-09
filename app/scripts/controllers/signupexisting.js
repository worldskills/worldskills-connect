'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:SignupexistingCtrl
 * @description
 * # SignupexistingCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('SignupExistingCtrl', function ($scope, User, $timeout, $state, Person, auth, WSAlert, API_PEOPLE, FORCED_EVENT_ID) {
  	
  $scope.tmp_user = {};
  $scope.loading.signupExisting = false;
  var _scope = $scope;

  $scope.saveExtra = function(){  	
  	//get data from people
  	Person.getProfile(auth.user.person_id).then(function(result){
  		User.create(result, $scope.tmp_user).then(function(result2){
        $scope.loading.signupExisting = true;
        
        //wait for the message to go through to auth and create the user role - and for the roles to refresh
        $timeout(function(){
          
          //refresh auth roles
          auth.refreshRoles().then(function(result){
            $scope.loading.signupExisting = false;

            $scope.reloadUser(); //no need to wait

            $state.go('event', {eventId : FORCED_EVENT_ID});            
          },
          function(error){
            $scope.loading.signupExisting = false;
            WSAlert.danger(error);
          });

        }, 3000);
  		},
  		function(error){
  			WSAlert.danger(error);
  		});
  	},
  	function(error){
  		WSAlert.danger(error);
  	});
  	  	
  };
    
  });
