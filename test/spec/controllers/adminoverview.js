'use strict';

describe('Controller: AdminOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var AdminOverviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminOverviewCtrl = $controller('AdminOverviewCtrl', {
      $scope: scope
    });
  }));

});
