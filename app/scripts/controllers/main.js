'use strict';

angular.module('connectApp')
  .controller('MainCtrl', function ($q, $scope, $state, $rootScope, $translate, Language, User, Events, Statuses, auth, WSAlert, Resources) {
    $scope.selectedLanguage = Language.selectedLanguage;    

    //redirect to events state - if logged in
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    	if($state.current.name == 'home' && auth.loggedIn == true){
            //force WSC2015
            $state.go('event', {eventId:1});

            //normal behavior to list events
    		//$state.go('events');
    	}
    });

    //loading scope variables that can be used throughout the app
    $scope.user = User;
    $scope.events = Events;
    $scope.statuses = Statuses;
    $scope.loading = {};    
    $scope.resources = Resources;

    $q.when(User.init()).then(function(){

        //load other resource
        var promises = [];
        promises.push(User.inbox());
        promises.push(User.getSubscriptions());
        promises.push(User.getConnections());
        promises.push(User.getRequested());
        promises.push(Resources.init());

        $q.all(promises).then(function(result){
            //console.log('loaded external resources');
            //User.data.subscriptions = result[1];
            //User.data.connections = result[2];
            //User.data.requested = result[3];
        },
        function(error){
            WSAlert.danger("Error loading user resources: " + error.data.user_msg);
        });
        //event subscriptions
		//User.subscriptions($scope.user.data.id).then(function(res){
		//	//console.log('subscriptions loaded');
		//},
		//function(error){
		//	WSAlert.danger("", error);
		//});

        //load inbox        
        //loaded in chain because it gets saved within the user var
        //User.getInbox().then(function(result){
        //    $scope.user.inbox = result;
        //},
        //function(error){
        //    //fail silently
        //});
    },
    function(error){
    	WSAlert.danger("", error);
    });

    //load events
    $scope.loading.events_init = true;
    Events.init().then(function(result){
    	//console.log("events init");   
        $scope.loading.events_init = false; 	
    },
    function(error){
    	WSAlert.danger("", error);
        $scope.loading.events_init = false;
    });

    //load events
    Statuses.init().then(function(result){
        //console.log("statuses init");       
    },
    function(error){
        WSAlert.danger("", error);
    });


  })
.directive("featured", function(){
  return {
    restrict: 'E',    
    replace: true,
    templateUrl: 'views/directive.events-sidebar.html'    
  }
});
