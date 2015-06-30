'use strict';

/**
 * @ngdoc service
 * @name connectApp.User
 * @description
 * # User
 * Service in the connectApp.
 */
angular.module('connectApp')
  .factory('User', function ($q, $http, API_CONNECT, $timeout, auth, APP_ID, APP_ROLES) {  	
  		var User = {
            data: $q.defer(),
            connections: $q.defer()
        };

  		User.init = function(){
    		// var featuredOnly = (featured) ? "?featured=" + featured : "";

            //wait for auth.user to resolve                    
            $q.when(auth.user.$promise).then(function(){
                $http.get(API_CONNECT + "/user/person/" + auth.user.person_id).then(function(result){                    
                    User.data.resolve();
                    User.data = result.data;                    
                },
                function(error){
                    User.data.reject("Could not fetch user: " + error.data.user_msg);
                })
            });    		

    		return User.data.promise;
    	};                

        User.isAdmin = function(){
            var isAdmin = false;

            angular.forEach(auth.user.roles, function(val, key){
                if(val.role_application.application_code == APP_ID && val.name == APP_ROLES.ADMIN)              
                    isAdmin = true;
            });

            return isAdmin;

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
                deferred.reject("Could not save subscription to event: " + error.data.user_msg);
            })

            return deferred.promise;
    	};

        User.actionConnection = function(connectionId, accepted){
            var deferred = $q.defer();
            var acceptStr = (accepted) ? "accept" : "deny";
            
            $http.put(API_CONNECT + "/connections/" + connectionId + "/" + acceptStr).then(function(res){
                deferred.resolve(res);
            },
            function(error){
                deferred.reject("Could not save connection: " + error.data.user_msg);
            });

            return deferred.promise;
        };

        User.deleteConnection = function(connectionId){
            var deferred = $q.defer();

            $http.delete(API_CONNECT + "/connections/" + connectionId).then(function(res){
                deferred.resolve(res);
            }, function(error){
                deferred.reject("Could not delete connection: " + error.data.user_msg);
            });

            return deferred.promise;
        }


       
        User.inbox = function(){
            var deferred = $q.defer();

            $http.get(API_CONNECT + "/connections/user/" + User.data.id + "/inbox").then(function(result){
                User.data.inbox = result.data;
                deferred.resolve(result.data);
            },
            function(error){
                deferred.reject("Could not fetch inbox: " + error.data.user_msg);
            });

            return deferred.promise;
        };

        User.getConnections = function(){       
            //User.connections = $q.defer();     

            $http.get(API_CONNECT + "/connections/user/" + User.data.id).then(function(result){
                User.connections.resolve(result.data);
                User.connections = result.data;
            },
            function(error){
                User.connections.reject("Could not fetch connections: " + error.data.user_msg);
            });
            
            return User.connections.promise;
        };

        User.requestContact = function(uid){
            var deferred = $q.defer();

            var postData = {
                "from": {
                    "id": User.data.id
                },
                "to": {
                    "id": uid
                },
                "accepted": false,
                "denied": false
            };

            $http.post(API_CONNECT + "/connections/", postData).then(function(result){
                deferred.resolve(result);
            },
            function(error){
                deferred.reject("Could not send contact request: " + error.data.user_msg);
            });

            return deferred.promise;
        };

        User.cancelRequest = function(connectionId){
            var deferred = $q.defer();

            $http.delete(API_CONNECT + "/connections/" + connectionId).then(function(result){
                deferred.resolve(result);
            },
            function(error){
                deferred.reject("Could not cancel request: " + error.data.user_msg);
            });

            return deferred.promise;
        };

        User.cancelRequestByUserId = function(userId){
            var deferred = $q.defer();

            //get connection id
            User.connectionExists(userId).then(function(result){
                //remove connection
                $http.delete(API_CONNECT + "/connections/" + result.id).then(function(result2){
                    deferred.resolve(result2);
                },
                function(error){
                    deferred.reject("Could not cancel request: " + error.data.user_msg);
                });            
            },
            function(error){
                deferred.reject(error.data.user_msg);
            });

            return deferred.promise;
        };

        User.getSent = function(){
            var deferred = $q.defer();

            $http.get(API_CONNECT + "/connections/user/" + User.data.id + "/sent").then(function(result){
                User.data.sent = result.data;
                deferred.resolve(result.data);
            },
            function(error){
                deferred.reject("Could not fetch sent contact requests: " + error.data.user_msg);
            });

            return deferred.promise;
        };

        User.isConnected = function(uid){    
            var connected = false;
                        
            angular.forEach(User.connections.connections, function(val, key){                    
                if(val.from.id == uid || val.to.id == uid){
                    connected = true;
                }
            });            

            return connected;
        };

        User.connectionExists = function(uid){
            var connected = false;

            var deferred = $q.defer();

            $http.get(API_CONNECT + "/connections/user/" + User.data.id + "?include_pending=1").then(function(result){
                //go through results
                angular.forEach(result.data.connections, function(val, key){
                    if(val.from.id == uid || val.to.id == uid) deferred.resolve(val);
                });
                deferred.reject();
            },
            function(error){
                deferred.reject(error.data.user_msg);
            });

            return deferred.promise;
        };



        //external resources        


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

                //User.data.subscriptions = temp_subscriptions;
                Subscriptions = temp_subscriptions;

                deferred.resolve(Subscriptions);
            },
            function(error){
                deferred.reject("Could not fetch subscriptions: " + error.data.user_msg);
            });

            return deferred.promise;
        };


        User.getById = function(uid){
            var deferred = $q.defer();

            $http.get(API_CONNECT + "/user/" + uid).then(function(result){
                deferred.resolve(result.data);
            },
            function(error){
                deferred.reject("Could not fetch user: " + error.data.user_msg);
            });

            return deferred.promise;
        };


  	return User;  
  });
