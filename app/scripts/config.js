(function() {
    'use strict';

    //TODO update values when integrating with API

    var connectApp = angular.module('connectApp');
    connectApp.constant('API_CONNECT', 'http://localhost:8080/connect');
    connectApp.constant('API_PEOPLE', 'http://localhost:8080/people');
    connectApp.constant('APP_ID', '1800');
    connectApp.constant('API_IMAGES', 'http://localhost:8080/images');
    connectApp.constant('CLIENT_ID', '4a770ce60c9b');
    connectApp.constant('API_AUTH', 'http://localhost:8080/auth');
    connectApp.constant('AUTHORIZE_URL', 'http://localhost:10100/oauth/authorize');
    connectApp.constant('LOGOUT_URL', 'http://localhost:10100/logout');
    connectApp.constant('SIGNUP_URL', 'http://localhost:10100/registration/connect');
    connectApp.constant('FORCED_EVENT_ID', 1);

    connectApp.constant('DATE_FORMAT', 'yyyy-MM-ddThh:mm:ssZ');
    connectApp.constant('WORLDSKILLS_CLIENT_ID', '4a770ce60c9b');
    connectApp.constant('WORLDSKILLS_API_AUTH', 'http://localhost:8080/auth');
    connectApp.constant('WORLDSKILLS_AUTHORIZE_URL', 'http://localhost:10100/oauth/authorize');

    connectApp.constant('LOAD_CHILD_ENTITY_ROLES', false);
    connectApp.constant('FILTER_AUTH_ROLES', [1800]);

    connectApp.constant('APP_ROLES', {
        ADMIN: 'Admin',
        MANAGER: 'Manager',
        USER: 'User'
    });

    connectApp.constant("REQUEST_STATUS", {
        NONE: 0,
        REQUESTED: 1,
        CONNECTED: 2,
        RECEIVED: 3,
        DENIED: 4
    });

})();
