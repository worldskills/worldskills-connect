'use strict';

describe('Controller: SignupConfirmedCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var SignupConfirmedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupConfirmedCtrl = $controller('SignupConfirmedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
