'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('EventCtrl', function ($scope, $http, Statuses) {
	
	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchContact   = '';     // set the default search/filter term
	$scope.Statuses = Statuses;
	$scope.STATUS = Statuses.status();
  
	
	$scope.contacts = [
	  { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: true},
	  { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: false},
	  { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: true},
	  { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: true},
	  { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: false},
	  { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: false},
	  { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: true},
	  { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: false},
	  { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: true},
	  { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: true},
	  { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: false},
	  { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: false},
	  { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: true},
	  { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: false},
	  { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: false},
	  { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: false}
	];

	$scope.search = function (contact) {
        return (angular.lowercase(contact.name).indexOf(angular.lowercase($scope.searchContact) || '') !== -1 
        	|| angular.lowercase(contact.company).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.position).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.country).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	);
    };
    
  $scope.totalItems = $scope.contacts.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;


  });
