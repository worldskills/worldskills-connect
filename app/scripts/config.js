(function() {
    'use strict';

    //TODO update values when integrating with API
    
    var connectApp = angular.module('connectApp'); 
    connectApp.constant('API_CONNECT', 'http://localhost:8080/connect');
    connectApp.constant('APP_ID', '1800');
    connectApp.constant('API_IMAGES', 'http://localhost:8080/images');
    connectApp.constant('CLIENT_ID', 'd3fcf7217efc');
    connectApp.constant('API_AUTH', 'http://localhost:8080/auth');
    connectApp.constant('AUTHORIZE_URL', 'http://localhost:10100/oauth/authorize');
    connectApp.constant('LOGOUT_URL', 'http://localhost:10100/logout');

    connectApp.constant('DATE_FORMAT', 'yyyy-MM-ddThh:mm:ssZ');
    connectApp.constant('WORLDSKILLS_CLIENT_ID', 'd3fcf7217efc');
    connectApp.constant('WORLDSKILLS_API_AUTH', 'http://localhost:8080/auth');
    connectApp.constant('WORLDSKILLS_AUTHORIZE_URL', 'http://localhost:10100/oauth/authorize');

    connectApp.constant('APP_ROLES', {
        ADMIN: 'Admin',
        MANAGER: 'Manager',
        USER: 'User'        
    });    

})();