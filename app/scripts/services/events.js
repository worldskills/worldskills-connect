'use strict';

/**
 * @ngdoc service
 * @name connectApp.Events
 * @description
 * # Events
 * Service in the connectApp.
 */
angular.module('connectApp')
  .service('Events', function ($q, $http, API_CONNECT) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {

    	list: function(featured){
    		var Events = {};
    		var deferred = $q.defer();
    		var featuredOnly = (featured) ? "?featured=" + featured : "";
    		
    		$http.get(API_CONNECT + "/events" + featuredOnly).then(function(result){
    			Events = result.data.connect_events;
    			deferred.resolve(Events);
    		},
    		function(error){
    			deferred.reject("Could not fetch events: " + error);
    		});

    		return deferred.promise;
    	}
    }    	
  });
