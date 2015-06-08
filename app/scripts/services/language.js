'use strict';

/**
 * @ngdoc service
 * @name worldSkillsApp.Language
 * @description
 * # Language
 * Service in the worldSkillsApp.
 */
angular.module('worldSkillsApp')
  .service('Language', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
        // AngularJS will instantiate a singleton by calling "new" on this function
	    var LanguageService = {
				selectedLanguage: 'en_US'	//defaults to en_US
	    };
	
	    return LanguageService;
  });
