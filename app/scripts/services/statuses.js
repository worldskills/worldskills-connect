'use strict';

/**
 * @ngdoc service
 * @name connectApp.Statuses
 * @description
 * # Statuses
 * Service in the connectApp.
 */
angular.module('connectApp')
  .service('Statuses', function ($q, $http, API_CONNECT) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var Statuses = {};

    Statuses.init = function(){
    	var deferred = $q.defer();

    	$http.get(API_CONNECT + "/subscription_statuses").then(function(result){
    		//cleanup
    		var temp_statuses = {};

    		angular.forEach(result.data.statuses, function(val, key){
    			temp_statuses[val.id] = val;
    		});

    		Statuses.data = temp_statuses;
    		deferred.resolve(Statuses.data);
    	},
    	function(error){
    		deferred.reject("Could not fetch statuses");
    	});

    	return deferred.promise;
    };

    Statuses.status = function(){
        return {
            'YES': 1,
            'MAYBE': 2,
            'NO': 3
        }
    };

    return Statuses;
  });