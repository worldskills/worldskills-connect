'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('ApplicationCtrl', function ($q, Auth, $scope, $state, auth, WSAlert, User, FORCED_EVENT_ID) {

    $scope.auth = auth;
    $scope.user = User;
    
    $scope.logout = function (e) {
        auth.logout();
    };
    
    //redirect to events state - if logged in
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){        

        $q.when(auth.user.$promise).then(function(){
            if($state.current.name == 'home' && auth.loggedIn == true){        
            
                if(Auth.activeRole() == false){
                    $state.go('signupExisting');
                    //prevent loading of data prematurely
                    $scope.allow_init = false;
                }
                else{
                    $state.go('event', {'eventId':FORCED_EVENT_ID});
                }
                //force WSC2015
            }
            else if($state.current.name == "signupExisting"){
                $scope.allow_init = false;            
            }
        });//when        
    });

    $scope.$on('$stateChangeStart', function () {
        WSAlert.clear();
    });        

  });
