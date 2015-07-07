'use strict';

/**
 * @ngdoc service
 * @name connectApp.Events
 * @description
 * # Events
 * Service in the connectApp.
 */
angular.module('connectApp')
  .factory('Events', function ($q, $http, API_CONNECT) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var Events = { data: $q.defer() };    

    Events.init = function(){
        //var deferred = $q.defer();
        if(typeof Events.data.promise == 'undefined') Events.data = $q.defer();
                
        $http.get(API_CONNECT + "/events").then(function(result){
            Events.data.resolve(result.data.connect_events);
            Events.data = result.data.connect_events;
        },
        function(error){
            Events.data.reject("Could not fetch events: " + error.data.user_msg);
        });
        return Events.data.promise;
    };    

    Events.getSubscriptions = function(eventId){
        var deferred = $q.defer();
        $http.get(API_CONNECT + "/subscriptions/events/" + eventId).then(function(result){
            deferred.resolve(result.data);
        },
        function(error){
            deferred.reject("Could not get event subscriptions: " + error.data.user_msg);
        });

        return deferred.promise;
    };

    return Events;   	
  });
