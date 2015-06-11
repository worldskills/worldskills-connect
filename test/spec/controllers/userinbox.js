'use strict';

describe('Controller: UserinboxCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var UserinboxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserinboxCtrl = $controller('UserInboxCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
