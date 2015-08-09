'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:AdminExportParticipantsCtrl
 * @description
 * # AdminExportParticipantsCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('AdminExportParticipantsCtrl', function ($scope, API_CONNECT, $q, $http, Events, Downloader, WSAlert) {

  	$scope.events = Events;

  	$scope.init = function(){
  		//load events
    	$scope.loading.events_init = true;
    	Events.init().then(function(result){
    	    $scope.loading.events_init = false; 	
    	},
    	function(error){
    		WSAlert.danger("", error);
    	    $scope.loading.events_init = false;
    	});
  	};

  	$scope.init();

    $scope.exportParticipantsData = function(eventId){
        $http({url: API_CONNECT + "/admin/export/participants/" + eventId, method: "GET", params: { s: "xlsx" }, responseType : "blob"})
        .success( function(data, status, headers) {
          
          var filename = 'export_participants.xlsx';
          Downloader.handleDownload(data, status, headers, filename);          
          WSAlert.success("Download started... (" + filename + ")");
        })
          .error(function(data, status) {
              //console.log("Request failed with status: " + status);
              WSAlert.danger("Request failed with status: " + status);
          });
    };
    
  })
  .directive("exportparticipants", function(){
  return {
    restrict: 'E',    
    replace: true,
    templateUrl: 'views/directive.events-export-participants.html'    
  }
});
