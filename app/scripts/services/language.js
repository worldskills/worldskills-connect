'use strict';

/**
 * @ngdoc service
 * @name connectApp.Language
 * @description
 * # Language
 * Service in the connectApp.
 */
angular.module('connectApp')
  .service('Language', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
        // AngularJS will instantiate a singleton by calling "new" on this function
	    var LanguageService = {
				selectedLanguage: 'en_US'	//defaults to en_US
	    };
	
	    return LanguageService;
  });
