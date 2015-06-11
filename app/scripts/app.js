'use strict';

/**
 * @ngdoc overview
 * @name connectApp
 * @description
 * # connectApp
 *
 * Main module of the application.
 */
angular
  .module('connectApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate'
  ])
  //.config(function ($routeProvider) {
    .config(function ($routeProvider, APP_ROLES, $translateProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');

    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .when('/events', {
    //     templateUrl: 'views/events.html',
    //     controller: 'EventsCtrl'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });

  $translateProvider.useStaticFilesLoader({
    prefix: 'languages/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en_US');
  $translateProvider.fallbackLanguage('en_US');
  $translateProvider.useLocalStorage();
  $translateProvider.useSanitizeValueStrategy('sanitize');

  //language negotiation
  //http://angular-translate.github.io/docs/#/guide/09_language-negotiation
  // $translateProvider.registerAvailableLanguageKeys(['en', 'pt'], {
  //   'en_US': 'en',
  //   'en_UK': 'en',
  //   'pt_BR': 'pt'    
  // });


//routes
  var assessmentCriteriaMenu = {
    templateUrl: 'views/assessmentCriteria.menu.html',
    controller: 'AssessmentcriteriamenuCtrl'
  };

  $stateProvider

  // //index
    .state('index', {
      url: '/',
      templateUrl: 'views/main.html',
      requireLoggedIn: false      
    })

   //personnel
   .state('events', {
     url: '/events',
     templateUrl: 'views/events.html',
     controller: 'EventsCtrl',
     requireLoggedIn: true,
      requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   .state('event', {
      url: '/event/:eventId',
      templateUrl: 'views/event.html',
      controller: 'EventCtrl',
      requireLoggedIn: true,
      requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   .state('user', {
    url: '/user/{userId}',
    templateUrl: 'views/user.html',
    controller: 'UserCtrl',
    abstract: true,
    requireLoggedIn: true,
      requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   .state('user.profile', {
    url: '',
    templateUrl: 'views/userprofile.html',
    controller: 'UserProfileCtrl',
    requireLoggedIn: true,
      requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   .state('user.inbox', {
    url: '/inbox',
    templateUrl: 'views/userinbox.html',
    controller: 'UserInboxCtrl',
    requireLoggedIn: true,
      requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   .state('user.sent', {
    url: '/sent',
    templateUrl: 'views/usersent.html',
    controller: 'UserSentCtrl',
    requireLoggedIn: true,
    requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   .state('user.connections', {
    url: '/connections',
    controller: 'UserConnectionsCtrl',
    templateUrl: 'views/userconnections.html',
    requireLoggedIn: true,
    requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

  .state('user.events', {
    url: '/events',
    controller: 'UserEventsCtrl',
    templateUrl: 'views/userevents.html',
    requireLoggedIn: true,
    requiredRoles: [
        {code: 1800, role: APP_ROLES.ADMIN},
        {code: 1800, role: APP_ROLES.MANAGER},
        {code: 1800, role: APP_ROLES.USER}
      ]
   })

   ;

  })
.run(function($rootScope, $state, $stateParams){
  //DEVELOPMENT API URL
  $rootScope.api_url = "http://localhost:8080/glossary/";
  $rootScope.available_languages = {"en_US":"English", "pt_BR":"Portuguese (Brazil)"};

  //PRODUCTION API URL
  //$rootScope.api_url = "http://beuk.worldskills.org/glossary/";

  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class='{ active: $state.includes('contacts.list') }'> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
