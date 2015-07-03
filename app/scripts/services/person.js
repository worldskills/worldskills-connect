'use strict';

/**
 * @ngdoc service
 * @name connectApp.Person
 * @description
 * # Person
 * Service in the connectApp.
 */
angular.module('connectApp')
  .service('Person', function ($q, $http, API_PEOPLE) {
    return {
    	saveProfile: function(pid, userObj){
    		var deferred = $q.defer();

    		//update people
    		var postData = {
    			'first_name': userObj.first_name,
    			'last_name': userObj.last_name,
    			'gender': userObj.gender,
    			'country': { id: userObj.country.id }    			
    		};

    		$http.put(API_PEOPLE + "/person/" + pid, postData).then(function(result){                
                deferred.resolve(result);
            },
            function(error){
                deferred.reject("Could not save person profile: " + error.data.user_msg);
            });

    		return deferred.promise;
    	},

    	updatePrimaryEmail: function(pid, email){
    		var deferred = $q.defer();

    		var postData = { 
    			"email_address": email
    		};

    		$http.put(API_PEOPLE + "/person/" + pid + "/emails/primary", postData).then(function(result){
    			deferred.resolve(result);
    		},
    		function(error){
    			deferred.reject("Could not update primary email address: " + error.data.user_msg);
    		});

    		return deferred.promise;
    	}
    };
  });
