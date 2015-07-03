'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserpasswordCtrl
 * @description
 * # UserpasswordCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserPasswordCtrl', function ($scope, $http, $state, $q, auth, Auth, API_AUTH, WSAlert, User, $translate, Language) {
        $scope.selectedLanguage = Language.selectedLanguage;    

    //init
    $scope.passwd_reset = false;
    $scope.tmp_person = {'passwd01': '', 'passwd02': '', 'current': ''};
    $scope.showPasswdDialog = false;    
    $scope.loading.password = true;

    $scope.continueToReset = function(){
        $scope.passwd_reset = true;
    };

    $scope.submitReset = function(){
        $scope.loading.password = true;
        //use user's own user id from auth provider
        $http.put(API_AUTH + "/users/" + $scope.AuthUser.id + "/password", {
            'old_password': $scope.tmp_person.current,
            'new_password': $scope.tmp_person.passwd01
        }).then(function(result){
            WSAlert.success("", "Password reset successfully!");
            $scope.passwd_reset = false;
            $scope.tmp_person.current = '';
            $scope.tmp_person.passwd01 = '';
            $scope.tmp_person.passwd02 = '';
            $scope.loading.password = false;
            $scope.edit_password.$setPristine();
        },
        function(data, status, headers, config){
            if(data.data.code == "300-194"){
                $scope.tmp_person.current = '';
                $scope.passwd_reset = false; //current pw incorrect
            }
            $scope.loading.password = false;
            
            WSAlert.danger('', data.data.user_msg);
        });               
           
    }//

    $q.when(User.data.promise).then(function(){
    	$q.when(Auth.getAuthUser(User.data.person_id)).then(function(AuthUser){
        	$scope.AuthUser = AuthUser;
        	$scope.loading.password = false;
    	});
    });    


    $scope.passwdValid = function(){
    	return !(($scope.edit_password.passwd01.$dirty && $scope.edit_password.passwd01.$invalid) || ($scope.edit_password.passwd02.$dirty && $scope.edit_password.passwd02.$invalid));
    };

    $scope.passwdMatch = function(){
    	return  ($scope.edit_password.passwd01.$modelValue == $scope.edit_password.passwd02.$modelValue);
    };
  });
