'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserProfileCtrl', function ($scope, User, WSAlert, $q) {

  	$scope.tmp_user = {};
  	$scope.countries = [
  		{"id":1,"abbreviation":"FI","name":{"lang_code":"en","text":"Finland"}},
  		{"id":2,"abbreviation":"AU","name":{"lang_code":"en","text":"Australia"}},
  		{"id":3,"abbreviation":"SE","name":{"lang_code":"en","text":"Sweden"}},
  		{"id":4,"abbreviation":"AT","name":{"lang_code":"en","text":"Austria"}},
  		{"id":5,"abbreviation":"CH","name":{"lang_code":"en","text":"Switzerland"}}
  	];

  	$scope.init = function(){
  		$q.when(User.data.promise).then(function(){
  			$scope.tmp_user = User.data;
  		});
  	};

  	$scope.init();

  	//edit
  	$scope.saveProfile = function(){
  		User.saveProfile().then(function(result){
  			console.log(result);
  			WSAlert.success("Profile information saved");
  			State.go('user.profile', {userId: $scope.userId});
  		},
  		function(error){
  			WSAlert.danger(error);
  		});
  	};

  });
