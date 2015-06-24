'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('EventsCtrl', function ($scope, $http, WSAlert, Events) {
  	//  .controller('PersonCtrl', function ($scope, Auth, $timeout, $modal, $interval, $upload, API_IMAGES, Person, $rootScope, $http, $q, API_PEOPLE, APP_ROLES, $stateParams, $state, $translate, WSAlert, Language) {

  $scope.events = {};

  	$scope.init = function(){
  		console.log('init');
  		
  		//load events
  		Events.list().then(function(data){
  			$scope.events = data;
  		},
  		function(error){
  			WSAlert.danger("", error);
  		});

  		//load popular connections
  		//TODO finish this
  	}

  	$scope.init();
    
  });
