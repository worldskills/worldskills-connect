'use strict';

describe('Controller: UserconnectionsCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var UserconnectionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserconnectionsCtrl = $controller('UserConnectionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
