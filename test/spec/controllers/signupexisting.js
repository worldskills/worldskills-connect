'use strict';

describe('Controller: SignupExistingCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var SignupExistingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupExistingCtrl = $controller('SignupExistingCtrl', {
      $scope: scope
    });
  }));

  
});
