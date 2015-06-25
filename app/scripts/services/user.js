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
  		var User = {};

  		User.init = function(){
    		var deferred = $q.defer();
    		// var featuredOnly = (featured) ? "?featured=" + featured : "";
    		
    		$http.get(API_CONNECT + "/user/person/" + 916).then(function(result){
    			User.data = result.data;
    			deferred.resolve(User.data);
    		},
    		function(error){
    			deferred.reject("Could not getch user: " + error);
    		})

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
                if(res.status != 201) 
                    deferred.reject("Could not save subscription to event: " + error);
                else                
                    deferred.resolve(res.data);
            },
            function(error){
                deferred.reject("Could not save subscription to event: " + error);
            })

            return deferred.promise;
    	};

  	return User;  
  });
