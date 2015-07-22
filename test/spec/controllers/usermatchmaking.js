'use strict';

describe('Controller: UserMatchMakingCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var UsermatchmakingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserMatchMakingCtrl = $controller('UserMatchMakingCtrl', {
      $scope: scope
    });
  }));

  
});
