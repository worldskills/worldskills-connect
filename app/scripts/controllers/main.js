'use strict';

angular.module('connectApp')
  .controller('MainCtrl', function ($scope, $state, $rootScope, $translate, Language, auth) {
    $scope.selectedLanguage = Language.selectedLanguage;    

    //redirect to events state - if logged in
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	if($state.current.name == 'home' && auth.loggedIn == true){
    		$state.go('events');
    	}
    })

  });
