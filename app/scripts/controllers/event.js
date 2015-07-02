'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('EventCtrl', function ($scope, $http, Statuses, User, Events, $state, $q, WSAlert, REQUEST_STATUS) {
	
	$scope.sortType     = 'user.last_name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchContact   = '';     // set the default search/filter term
  $scope.user = User;
	$scope.Statuses = Statuses;
	$scope.STATUS = Statuses.status();
  $scope.loading.event = false;
	$scope.loading.contact = {};
  $scope.subscriptions = {};
  $scope.REQUEST_STATUS = REQUEST_STATUS;


  //Pagination
  $scope.totalItems = 0 //Total number of items in all pages
  $scope.currentPage = 1;
  $scope.itemsPerPage = 25; // (Defaults: 10) : Maximum number of items per page. A value less than one indicates all items on one page.
  $scope.numPages = 1; //(Defaults: angular.noop) : An optional expression assigned the total number of pages to display.
  $scope.maxSize = 5; //Limit number for pagination size.
  $scope.bigCurrentPage = 1; // Current page number. First page is 1.

	$scope.eventId = $state.params.eventId;

  $scope.init = function(){
    Events.getSubscriptions($scope.eventId).then(function(result){
      $scope.subscriptions = result;  

      $scope.totalItems = ($scope.subscriptions.total_count - 1); //minus my own profile

      $scope.setActioned();
    },
    function(error){
      WSAlert.danger(error);
    });
  };

  $scope.init();

	$scope.setAttendance = function(status, e){        
        e.preventDefault();
        //e.stopPropagation(); 
        
  		$scope.loading.event = true;

  		User.setAttendance($scope.eventId, status).then(function(res){
  			//set status to UI  		
  			if(typeof User.subscriptions[$scope.eventId] == 'undefined') //init
  				User.subscriptions[$scope.eventId] = {};
  			
  			User.subscriptions[$scope.eventId].status = res.status;
  			$scope.loading.event = false;
  		},
  		function(error){
  			WSAlert.danger(error);
  			$scope.loading.event = false;
  		});
  	};
  
	$scope.search = function (contact) {
        return (
             angular.lowercase(contact.user.first_name).indexOf(angular.lowercase($scope.searchContact) || '') !== -1 
          || angular.lowercase(contact.user.last_name).indexOf(angular.lowercase($scope.searchContact) || '') !== -1 
        	|| angular.lowercase(contact.user.company).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.user.job_title).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.user.country.name.text).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	);
    };



  $scope.setPage = function (pageNo) {
    $scope.bigCurrentPage = pageNo;    
  };

  $scope.pageChanged = function() { //can be used together with ng-model to call a function whenever the page changes.
    $scope.setActioned();
  };

  //sets connection requested tag in items dynamically
  $scope.setActioned = function(){ 
    $q.all([User.connections.promise, User.requested.promise]).then(function(){
      $scope.startFrom = (($scope.bigCurrentPage - 1 ) * $scope.itemsPerPage);
  
      //go through visible contacts and set connection request status    
      for(var i = $scope.startFrom ; i < ($scope.startFrom + $scope.itemsPerPage) ; i++){
        //skip if not a record
        if(typeof $scope.subscriptions.subscriptions[i] == 'undefined') continue;

        if(User.isRequested($scope.subscriptions.subscriptions[i].user.id)) $scope.subscriptions.subscriptions[i].user.request_status = REQUEST_STATUS.REQUESTED;
        if(User.isConnected($scope.subscriptions.subscriptions[i].user.id)) $scope.subscriptions.subscriptions[i].user.request_status = REQUEST_STATUS.CONNECTED;
        else $scope.subscriptions.subscriptions[i].user.requested = REQUEST_STATUS.NONE;

        //if(User.requested.requested_ids.indexOf($scope.subscriptions.subscriptions[i].user.id) != -1){
        //  //user is connected
        //  $scope.subscriptions.subscriptions[i].user.requested = true;
        //}
        //else 
        //  $scope.subscriptions.subscriptions[i].user.requested = false;
      }
    });
  };

    $scope.requestContact = function(userId, $index){
        $scope.loading.contact[userId] = true;

        User.requestContact(userId).then(function(){
            //WSAlert.success("Contact request sent");
            $scope.loading.contact[userId] = false;                        
            $scope.init();
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.contact[userId] = false;
        });
    };

    $scope.cancelRequest = function(userId, $index){
        $scope.loading.contact[userId] = true;

        User.cancelRequestByUserId(userId).then(function(result){
            //WSAlert.success("Contact request cancelled");
            $scope.loading.contact[userId] = false;            
            $scope.init();
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.contact[userId] = false;
        });
    };




  });
