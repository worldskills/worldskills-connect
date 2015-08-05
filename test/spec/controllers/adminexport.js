'use strict';

describe('Controller: AdminExportCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var AdminExportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminExportCtrl = $controller('AdminExportCtrl', {
      $scope: scope
    });
  }));


});
