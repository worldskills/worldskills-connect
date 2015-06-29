'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserinboxCtrl
 * @description
 * # UserinboxCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserInboxCtrl', function ($scope, User) {  	

  	$scope.actionConnection = function(connectionId, accepted){
  		console.log(connectionId);
  		console.log(accepted);

  	};
  });
