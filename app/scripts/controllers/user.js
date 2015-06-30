'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserCtrl', function ($q, $scope, $state, Language, APP_ROLES, $timeout, User, auth, WSAlert) {
    $scope.loading = {};    
    $scope.userId = $state.params.userId;
    $scope.myProfile = false;
    $scope.profile = {}; 
    $scope.connected = false;
    $scope.connectedAndAccepted = false;


    $scope.init = function(){
        $scope.loading.user = true;

        //load user info
        User.getById($scope.userId).then(function(result){
            $scope.loading.user = false;
            $scope.profile = result;

            //check if a connection exists between the users
            $scope.loading.request_contact = true;
            User.connectionExists($scope.userId).then(function(){
                $scope.loading.request_contact = false;
                $scope.connected = true;
            },
            function(error){
                //not really an error, but no connection here, stop loading
                $scope.loading.request_contact = false;
                $scope.connected = false;
            });

            $q.when(User.connections.promise).then(function(){
                $scope.connectedAndAccepted = User.isConnected($scope.userId);
            });
            
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.user = false;
        });

        //get user subscriptions
        User.subscriptions($scope.userId).then(function(result){
            $scope.profile.subscriptions = result;
        },
        function(error){
            WSAlert.danger("", error);
        })

        //check if user is editable        
        $q.when(User.data.promise).then(function(){
            $scope.myProfile = (User.data.id == $scope.userId) ? true : false;
        },
        function(error){
            WSAlert.danger("", "Could not fetch user edit status: " + error.data.user_msg);
        });
    };

    //$scope.init();

    $scope.requestContact = function(userId){
        $scope.loading.request_contact = true;

        User.requestContact(userId).then(function(){
            WSAlert.success("Contact request sent");
            $scope.loading.request_contact = false;
            $scope.init();
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.request_contact = false;
        });
    };

    $scope.cancelRequest = function(userId){
        $scope.loading.request_contact = true;

        User.cancelRequestByUserId(userId).then(function(result){
            WSAlert.success("Contact request cancelled");
            $scope.loading.request_contact = false;
            $scope.init();
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.request_contact = false;
        });
    };

    //after User has loaded
    $q.when(User.data.promise).then(function(){
        $scope.init();
    });     

  })
.directive('requestbtn', function(){
  return {
    restrict: 'E',    
    replace: true,
    templateUrl: 'views/directive.requestbtn.html'    
  }
});
