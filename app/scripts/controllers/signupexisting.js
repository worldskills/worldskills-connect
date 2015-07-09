'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:SignupexistingCtrl
 * @description
 * # SignupexistingCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('SignupExistingCtrl', function ($scope, User, $state, Person, auth, WSAlert, API_PEOPLE) {
  	
  $scope.tmp_user = {};

  $scope.saveExtra = function(){  	
  	//get data from people
  	Person.getProfile(auth.user.person_id).then(function(result){
  		User.create(result, $scope.tmp_user).then(function(result2){
        WSAlert.success("Connect User created");
        console.log(result2);
        //$state.go('events');
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
