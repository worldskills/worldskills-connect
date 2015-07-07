'use strict';

describe('Controller: UserImageCropperCtrl', function () {

  // load the controller's module
  beforeEach(module('connectApp'));

  var UserImageCropperCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserImageCropperCtrl = $controller('UserImageCropperCtrl', {
      $scope: scope
    });
  }));

});
