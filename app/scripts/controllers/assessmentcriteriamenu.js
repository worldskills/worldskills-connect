'use strict';

angular.module('worldSkillsApp')
  	.controller('AssessmentcriteriamenuCtrl', function ($scope, $translate, $state, $stateParams, Language) {
    $scope.selectedLanguage = Language.selectedLanguage;
    $scope.selectedMenu = $stateParams.stepName;
  });


