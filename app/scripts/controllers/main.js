'use strict';

angular.module('connectApp')
  .controller('MainCtrl', function ($scope, $state, $rootScope, $translate, Language, User, Events, Statuses, auth) {
    $scope.selectedLanguage = Language.selectedLanguage;    

    //redirect to events state - if logged in
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	if($state.current.name == 'home' && auth.loggedIn == true){
    		$state.go('events');
    	}
    });

    //loading scope variables that can be used throughout the app
    $scope.user = User;
    $scope.events = Events;
    $scope.statuses = Statuses;
    $scope.loading = {};

    User.init().then(function(result){
    	//console.log('user init');
		User.subscriptions($scope.user.data.id).then(function(res){
			//console.log('subscriptions loaded');
		},
		function(error){
			WSAlert("", error);
		});
    },
    function(error){
    	WSAlert.danger("", error);
    });

    //load events
    Events.init().then(function(result){
    	//console.log("events init");    	
    },
    function(error){
    	WSAlert.danger("", error);
    });

    //load events
    Statuses.init().then(function(result){
        //console.log("statuses init");       
    },
    function(error){
        WSAlert.danger("", error);
    });


  });
