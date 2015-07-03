'use strict';

describe('Controller: UserPasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var UserpasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserpasswordCtrl = $controller('UserPasswordCtrl', {
      $scope: scope
    });
  }));

});
