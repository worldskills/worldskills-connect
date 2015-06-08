'use strict';

angular.module('worldSkillsApp')
  .controller('MainCtrl', function ($scope, $state, $translate, Language) {
    $scope.selectedLanguage = Language.selectedLanguage;
  });
