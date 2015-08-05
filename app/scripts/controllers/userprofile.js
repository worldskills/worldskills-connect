'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserprofileCtrl
 * @description
 * # UserprofileCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserProfileCtrl', function ($scope, User, WSAlert, $q, $state, Resources, Person, APP_ROLES) {

  	$scope.tmp_user = {};
    $scope.app_roles = APP_ROLES;
    $scope.countries = Resources.countries;
    $scope.dateRangePickerOptions = {format: "DD.MM.YYYY", startDate: '12.08.2015', endDate: '17.08.2015', minDate: '12.08.2015', maxDate: '17.08.2015'};
    $scope.interests = {
      dates: { startDate: null, endDate: null}
    };

    //differently named init() for not to overwrite the user.js controller init() which is called on $scope.reloadProfile()
  	$scope.initProfile = function(){
  		$q.when(User.data.promise).then(function(){
  			$scope.tmp_user = User.data;
  		});

      $q.when(Resources.loading.promise).then(function(){
        //load countries
        $scope.countries = Resources.countries;
      });
  	};

  	$scope.initProfile();

  	//edit
  	$scope.saveProfile = function(){

      var promises = [];
      //save profile in people
      promises.push(Person.saveProfile(User.data.person_id, $scope.tmp_user));
      //update primary email in people
      promises.push(Person.updatePrimaryEmail(User.data.person_id, $scope.tmp_user.email_address));
      //save the rest of the fields in connect user
      promises.push(User.saveProfile($scope.tmp_user));

      $q.all(promises).then(function(result){
        $scope.reloadProfile();
        $state.go('user.profile', {userId: $scope.userId});
      },
      function(error){
        WSAlert.danger(error);
      });
  		//User.saveProfile($scope.tmp_user).then(function(result){
  		//	WSAlert.success("Profile information saved");
      //  $scope.reloadProfile();
  		//	$state.go('user.profile', {userId: $scope.userId});
  		//},
  		//function(error){
  		//	WSAlert.danger(error);
  		//});
  	};

    $scope.reloadProfile = function(){
      //reload
      $scope.init();
    };

  });
