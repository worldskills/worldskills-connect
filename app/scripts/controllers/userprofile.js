'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserProfileCtrl', function ($scope, User, WSAlert, $q, $state, Resources) {

  	$scope.tmp_user = {};
    $scope.countries = Resources.countries;

    // $scope.init = function(){

    // };

  	// $scope.countries = [
  	// 	{"id":1,"abbreviation":"FI","name":{"lang_code":"en","text":"Finland"}},
  	// 	{"id":2,"abbreviation":"AU","name":{"lang_code":"en","text":"Australia"}},
  	// 	{"id":3,"abbreviation":"SE","name":{"lang_code":"en","text":"Sweden"}},
  	// 	{"id":4,"abbreviation":"AT","name":{"lang_code":"en","text":"Austria"}},
  	// 	{"id":5,"abbreviation":"CH","name":{"lang_code":"en","text":"Switzerland"}}
  	// ];

  	$scope.init = function(){
  		$q.when(User.data.promise).then(function(){
  			$scope.tmp_user = User.data;
  		});

      $q.when(Resources.loading.promise).then(function(){
        //load countries
        $scope.countries = Resources.countries;
      });
  	};

  	$scope.init();

  	//edit
  	$scope.saveProfile = function(){
  		User.saveProfile($scope.tmp_user).then(function(result){
  			WSAlert.success("Profile information saved");
        $scope.reloadProfile();
  			$state.go('user.profile', {userId: $scope.userId});
  		},
  		function(error){
  			WSAlert.danger(error);
  		});
  	};

    $scope.reloadProfile = function(){
      $scope.$parent.init();
      //User.init().then(function(result){
      //  console.log('reloaded');
      //  console.log(result);
      //  console.log(User.data.first_name);
      //},
      //function(error){
      //  WSAlert.danger(error);
      //});
    };

  });
