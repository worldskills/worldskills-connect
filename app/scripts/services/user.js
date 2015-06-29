'use strict';

/**
 * @ngdoc service
 * @name connectApp.User
 * @description
 * # User
 * Service in the connectApp.
 */
angular.module('connectApp')
  .service('User', function ($q, $http, API_CONNECT, $timeout, auth) {  	
  		var User = {
        };

  		User.init = function(){
    		var deferred = $q.defer();
    		// var featuredOnly = (featured) ? "?featured=" + featured : "";

            //wait for auth.user to resolve                    
            $q.when(auth.user.$promise).then(function(){
                $http.get(API_CONNECT + "/user/person/" + auth.user.person_id).then(function(result){
                    User.data = result.data;
                    deferred.resolve(User.data);
                },
                function(error){
                    deferred.reject("Could not fetch user: " + error);
                })
            });    		

    		return deferred.promise;
    	};                

    	User.subscriptions = function(uid){
    		var Subscriptions = {};
    		var deferred = $q.defer();

    		$http.get(API_CONNECT + "/subscriptions/users/" + uid).then(function(result){

    			Subscriptions = result.data;
    			//User.data.subscriptions = Subscriptions;
    			var temp_subscriptions = {};

                //cleanup, go through all subs
    			angular.forEach(result.data.subscription, function(val, key){
    				temp_subscriptions[val.event.id] = val;  	
    			});                

    			User.data.subscriptions = temp_subscriptions;
    			Subscriptions = temp_subscriptions;

    			deferred.resolve(Subscriptions);
    		},
    		function(error){
    			deferred.reject("Could not fetch subscriptions: " + error);
    		});

    		return deferred.promise;
    	};

    	User.setAttendance = function(event, status){
            var deferred = $q.defer();
            
            var postData = {
                "user"  : { "id" : User.data.id },
                "event" : { "id" : event },
                "status": { "id" : status}
            };

            $http.put(API_CONNECT + "/subscriptions", postData).then(function(res){
                deferred.resolve(res.data);
            },
            function(error){
                deferred.reject("Could not save subscription to event: " + error);
            })

            return deferred.promise;
    	};

        User.getById = function(uid){
            var deferred = $q.defer();

            $http.get(API_CONNECT + "/user/" + uid).then(function(result){
                deferred.resolve(result.data);
            },
            function(error){
                deferred.reject("Could not fetch user: " + error);
            });

            return deferred.promise;
        };

        User.getInbox = function(uid){
            var deferred = $q.defer();

            $http.get(API_CONNECT + "/connections/user/" + uid + "/inbox").then(function(result){
                deferred.resolve(result.data);
            },
            function(error){
                deferred.reject("Could not fetch connections: " + error);
            });

            return deferred.promise;
        };

  	return User;  
  });
