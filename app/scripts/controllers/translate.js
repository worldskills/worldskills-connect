'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:TranslateCtrl
 * @description
 * # TranslateCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('TranslateCtrl', function ($translate, $translateLocalStorage, $scope, Language) {

		//get current language from local storage		
		Language.selectedLanguage = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
		$scope.selectedLanguage = Language.selectedLanguage;

		$scope.changeLanguage = function(langKey){			
			$translate.use(langKey);
			Language.selectedLanguage = langKey;			
			$scope.selectedLanguage = langKey;
		};	

  });
