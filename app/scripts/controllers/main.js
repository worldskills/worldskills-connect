'use strict';

angular.module('connectApp')
  .controller('MainCtrl', function ($scope, $state, $translate, Language) {
    $scope.selectedLanguage = Language.selectedLanguage;
  });
