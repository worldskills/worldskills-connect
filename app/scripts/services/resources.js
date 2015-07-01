'use strict';

/**
 * @ngdoc service
 * @name connectApp.Resources
 * @description
 * # Resources
 * Service in the connectApp.
 */
angular.module('connectApp')
  .factory('Resources', function ($q, $http, API_CONNECT) {
    var Resources = {
    	loading: $q.defer()
    };

    Resources.init = function(){
        if(typeof Resources.loading.promise == 'undefined') Resources.loading = $q.defer();

        var promises = [];
        promises.push(Resources.getCountries());
        $q.all(promises).then(function(result){            
            Resources.countries = result[0];
            Resources.loading.resolve();
        },
        function(error){
            Resources.loading.reject("Could not init resources: " + error);
        });

        return Resources.loading.promise;
    };

    Resources.getCountries = function(){
    	var deferred = $q.defer();

    	$http.get(API_CONNECT + "/countries").then(function(result){    		
    		Resources.countries = result.data.countries;
            deferred.resolve(result.data.countries);
    	},
    	function(error){
    		deferred.reject("Could not get countries: " + error);
    	});

    	return deferred.promise;
    };

    return Resources;
  });
