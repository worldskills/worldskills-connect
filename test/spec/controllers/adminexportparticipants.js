'use strict';

describe('Controller: AdminExportParticipantsCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var AdminExportParticipantsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminExportParticipantsCtrl = $controller('AdminExportParticipantsCtrl', {
      $scope: scope
    });
  }));

});
