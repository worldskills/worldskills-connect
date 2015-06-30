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

    var Events = {};    

    Events.init = function(){
        var deferred = $q.defer();
                
        $http.get(API_CONNECT + "/events").then(function(result){
            Events.data = result.data.connect_events;
            deferred.resolve(Events.data);
        },
        function(error){
            deferred.reject("Could not fetch events: " + error.data.user_msg);
        });
        return deferred.promise;
    };    

    return Events;   	
  });
