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
    $scope.dateRangePickerOptions = {format: "DD.MM.YYYY", startDate: '12.08.2015', endDate: '17.08.2015', minDate: '12.08.2015', maxDate: '17.08.2015'};
    $scope.interests = {
      dates: { startDate: null, endDate: null}
    };

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
    };

  });
