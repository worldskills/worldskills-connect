'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserCtrl', function ($q, $scope, $state, Language, APP_ROLES, User, auth) {
    $scope.loading = {};    
    $scope.userId = $state.params.userId;
    $scope.editable = false; 


    $scope.init = function(){
        $scope.loading.user = true;

        //load user info
        User.getById($scope.userId).then(function(result){
            $scope.loading.user = false;
            $scope.user = result;

            //preload inbox - server should reject if it's not me
            //loaded in chain because it gets saved within the user var
            User.getInbox($scope.userId).then(function(result){
                $scope.user.inbox = result;
            },
            function(error){
                //fail silently
            });


        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.user = false;
        });

        // //check if user is editable
        // $q.when(User.getUser()).then(function(result){
        //     console.log(result.data);
        //     //console.log(result);
        //     //console.log(User);
        // });
    };

    $scope.init();

  });
