'use strict';

angular.module('connectApp')
  .service('Auth', function Person(API_AUTH, auth, APP_ROLES, APP_ID, $http, $q, $stateParams) {
  	
  	return{  		

    activeRole: function(){
      var retval = false;
        angular.forEach(auth.user.roles, function(val, key){
             if(val.role_application.application_code == APP_ID){
               retval = val.name;
             }
         });
        return retval;
    },

    getAuthUser: function(pid){
      var User = {};
      var deferred = $q.defer();

      $http.get(API_AUTH + "/users/person/" + pid)
        .then(function(result){
          deferred.resolve(result.data);
        },
        function(error){
          deferred.reject("Could not fetch Auth User: " + error);
        });

      return deferred.promise;
    },   
		
	}
});