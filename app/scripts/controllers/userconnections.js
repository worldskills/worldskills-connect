'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserconnectionsCtrl
 * @description
 * # UserconnectionsCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserConnectionsCtrl', function ($scope) {

	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchContact   = '';     // set the default search/filter term
  
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


	$scope.searchConnections = function (contact) {
        return (angular.lowercase(contact.name).indexOf(angular.lowercase($scope.searchContact) || '') !== -1 
        	|| angular.lowercase(contact.company).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.position).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.country).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	);
    };

  });
