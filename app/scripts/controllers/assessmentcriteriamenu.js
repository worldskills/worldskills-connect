'use strict';

angular.module('connectApp')
  	.controller('AssessmentcriteriamenuCtrl', function ($scope, $translate, $state, $stateParams, Language) {
    $scope.selectedLanguage = Language.selectedLanguage;
    $scope.selectedMenu = $stateParams.stepName;
  });


