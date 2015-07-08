'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserconnectionsCtrl
 * @description
 * # UserconnectionsCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserConnectionsCtrl', function ($scope, User, $q, WSAlert) {

	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchContact   = '';     // set the default search/filter term
	$scope.contacts = [];
	$scope.loading.connections = {};
  
	// $scope.contacts = [
	//   { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: true},
	//   { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: false},
	//   { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: true},
	//   { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: true},
	//   { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: false},
	//   { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: false},
	//   { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: true},
	//   { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: false},
	//   { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: true},
	//   { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: true},
	//   { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: false},
	//   { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: false},
	//   { 'id': 1, name: 'Joni Aaltonen', 	company: 'WorldSkills', position: 'Position 1', country: 'Finland', requestSent: true},
	//   { 'id': 1, name: 'John Cox', 			company: 'WorldSkills', position: 'Position 2', country: 'Australia', requestSent: false},
	//   { 'id': 1, name: 'Adam Walsh', 		company: 'WorldSkills', position: 'Position 3', country: 'Australia', requestSent: false},
	//   { 'id': 1, name: 'Fabian Vogler', 	company: 'WorldSkills', position: 'Position 4', country: 'Switzerland' , requestSent: false}
	// ];


	$scope.removeConnection = function(connectionId, $index){
		if(confirm("Are you sure?")){
		$scope.loading.connections[connectionId] = true;
		User.deleteConnection(connectionId).then(function(res){		
			console.log(User.connections);
			console.log(User.connections.connections);
			User.connections.connections.splice($index, 1);
			User.connections.total_count -= 1;
			User.connections.totalConnections -= 1;
			$scope.contacts.splice($index, 1);

			WSAlert.success("Connection deleted");
			$scope.loading.connections[connectionId] = false;
			
		},
		function(error){
			WSAlert.danger("", error);
			$scope.loading.connections[connectionId] = false;
		});
		}
	};

	$scope.refresh = function(){	
		$scope.loading.connections = true;

		//if still loading
		if(typeof User.connections.promise == 'object'){
			//console.log("still loading initial");
			$scope.init();
		}//if
		else{
			//console.log("needs refreshing");
			User.getConnections().then(function(){
				$scope.init();
			});
		}
	};

	$scope.init = function(){
		$q.when(User.connections.promise).then(function(result){
			angular.forEach(User.connections.connections, function(val, key){
				var temp_contact = false;

				if(val.to.id != User.data.id)
					temp_contact = val.to;
				else if(val.from.id != User.data.id)
					temp_contact = val.from;

				//add in connection id for later use
				if(typeof temp_contact == 'object'){
					temp_contact.connection_id = val.id;
					$scope.contacts.push(temp_contact);
				}				
			});
			$scope.loading.connections = false;
		});	
	}

	$scope.refresh();


	$scope.searchConnections = function (contact) {
        return (
        	angular.lowercase(contact.first_name).indexOf(angular.lowercase($scope.searchContact) || '') !== -1 
        	|| angular.lowercase(contact.last_name).indexOf(angular.lowercase($scope.searchContact) || '') !== -1 
        	|| angular.lowercase(contact.company).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.job_title).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	|| angular.lowercase(contact.country.name.text).indexOf(angular.lowercase($scope.searchContact) || '') !== -1
        	);
    };

    $scope.downloadXLSX = function(){
    	User.getConnectionsSpreadsheet();
    };

    $scope.downloadVCF = function(){
    	alert("Not yet implemented...");
    };

    $scope.download = function(connectionId, firstName, lastName){
    	
    	User.getConnectionVCF(connectionId, firstName + ' ' + lastName);
    };
  });
