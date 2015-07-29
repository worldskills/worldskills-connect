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
            Events.data.reject("Could not fetch events");
        });
        return Events.data.promise;
    };    

    Events.getSubscriptions = function(eventId, offsetVal, limitVal, searchVal, sortVal, sortReverseVal, canceler){
    	var deferred = $q.defer();

        $http.get(API_CONNECT + "/subscriptions/events/" + eventId, {timeout: canceler.promise, params: {offset: offsetVal, limit: limitVal, search: searchVal, sort: sortVal, sortReverse: sortReverseVal} }).then(function(result){
            deferred.resolve(result.data);
        },
        function(error){
            //only send error if not a cancelled request
            if(error.data != null && error.status == 0)
                deferred.reject("Could not get event subscriptions: " + error.data.user_msg);
        });

        return deferred.promise;
    };

    return Events;   	
  });
