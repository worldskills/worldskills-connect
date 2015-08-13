'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserMatchMakingCtrl
 * @description
 * # UserMatchMakingCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserMatchMakingCtrl', function ($scope, $q, $http, User, WSAlert) {

  	$scope.matchMakingEnabled = false;
  	$scope.dateRangePickerOptions = {format: "DD.MM.YYYY", startDate: '12.08.2015', endDate: '17.08.2015', minDate: '01.08.2015', maxDate: '31.08.2015'};

    
    $scope.languages = [
    	{'code': 'en', 'name' : 'English'},
    	{'code': 'pt', 'name' : 'Portuguese'},
    	{'code': 'es', 'name' : 'Spanish'}
    ];    

    $scope.saveAll = function(){
    	//save interests
    	$scope.loading.matchmaking = true;
    	var saving = [];
    	
    	//user skills
    	//quick and dirty //TODO make better

    	//see if need to delete any skills
    	angular.forEach($scope.original_user_interests.skills, function(val, key){
    		//see if it's still here
    		var found = false;
    		angular.forEach($scope.user_interests.skills, function(val2, key2){
    			if(val.id == val2.id) found = true;
    		});

    		if(!found)
    			saving.push(User.removeInterest(val.id));
    	});

    	//same for types
    	angular.forEach($scope.original_user_interests.contact_types, function(val, key){
    		//see if it's still here
    		var found = false;
    		angular.forEach($scope.user_interests.contact_types, function(val2, key2){
    			if(val.id == val2.id) found = true;
    		});

    		if(!found)
    			saving.push(User.removeInterest(val.id));
    	});



    	//save only new ones

    	angular.forEach($scope.user_interests.skills, function(val, key){
    		var found = false
    		angular.forEach($scope.original_user_interests.skills, function(val2, key2){
    			if(val.id == val2.id) found = true;
    		});

    		if(!found)
    		saving.push(User.saveInterest(val));
    	});

    	angular.forEach($scope.user_interests.contact_types, function(val, key){
    		var found = false
    		angular.forEach($scope.original_user_interests.contact_types, function(val2, key2){
    			if(val.id == val2.id) found = true;
    		});

    		if(!found)
    		saving.push(User.saveInterest(val));
    	});

    	//save matchmaking profile
    	saving.push(User.saveMatchmaking($scope.matchmaking));

    	$q.all(saving).then(function(result){
    		WSAlert.success("Matchmaking profile saved successfully!");
    		$scope.loadMatchMaking();
    	},
    	function(error){
    		WSAlert.danger("Some parts of the profile could not be saved...");
    	});

    	
    };

  	$scope.loadMatchMaking = function(){
  		//init scope variables
  		$scope.matchmaking = {
      		dates: { startDate: null, endDate: null}
    	};
    	
    	$scope.interests_skills = [];    
    	$scope.interests_contact_types = []; 
    	$scope.user_interests = {
    		'skills' : [],
    		'contact_types': []
    	};   

    $scope.original_user_interests = {};

  		$scope.loading.matchmaking = true;
      console.log($scope.matchmaking);
  		$q.when(User.data.promise).then(function(){
  			User.getMatchMaking().then(function(result){
  				$scope.matchmaking = result;
  				$scope.matchMakingEnabled = result.enabled;

  				//set date picker
  				$scope.matchmaking.dates = {};
  				$scope.matchmaking.dates.startDate = result.date_start;
  				$scope.matchmaking.dates.endDate = result.date_end;
  				delete $scope.matchmaking.date_start;
  				delete $scope.matchmaking.date_end;

  				//set language
  				angular.forEach($scope.languages, function(val, key){
  					if(val.code == $scope.matchmaking.lang_code) $scope.matchmaking.lang_code = $scope.languages[key];
  				});
  				$scope.loading.matchmaking = false;
  			},
  			function(error){
  				$scope.matchMakingEnabled = false;
  				$scope.loading.matchmaking = false;
  			});

  			//load all interests
  			var interest_promises = [];
  			interest_promises.push(User.getInterests());
  			interest_promises.push(User.getUserInterests());
  			$q.all(interest_promises).then(function(result){

  				angular.forEach(result[0].interests, function(val, key){
  					if(val.categoryIndex == 1) $scope.interests_contact_types.push(val);
  					else if(val.categoryIndex == 2) $scope.interests_skills.push(val);
  				});

  				angular.forEach(result[1].user_interests, function(val, key){
  					if(val.interest.categoryIndex == 1) $scope.user_interests.contact_types.push(val.interest);
  					else if(val.interest.categoryIndex == 2) $scope.user_interests.skills.push(val.interest);
  				});  		

  				angular.copy($scope.user_interests, $scope.original_user_interests);


  			},
  			function(error){
  				WSAlert.danger("Could not load interests: " + error);
  			});

  			// //load match making
  			// User.getUserInterests().then(function(result){

  			// },
  			// function(error){
  			// 	WSAlert.danger("Could not load interests: " + error);
  			// 	$scope.loading.interests = false;
  			// });
  		});
  	};

  	$scope.switchMatchMaking = function(){
  		User.switchMatchMaking(!$scope.matchMakingEnabled).then(function(){
  			$scope.matchMakingEnabled = !$scope.matchMakingEnabled;
  		},
  		function(error){
  			WSAlert.warning("Could not switch matchmaking to active/inactive");
  		});
  	};

  	$scope.loadMatchMaking();

  });
