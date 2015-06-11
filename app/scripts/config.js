(function() {
    'use strict';

    var connectApp = angular.module('connectApp'); 
    connectApp.constant('API_MYAPP', 'http://myapp.diaz.worldskills.org');
    connectApp.constant('API_IMAGES', 'http://images.diaz.worldskills.org');
    connectApp.constant('CLIENT_ID', '');
    connectApp.constant('API_AUTH', 'http://auth.diaz.worldskills.org/');
    connectApp.constant('AUTHORIZE_URL', 'http://auth.diaz.worldskills.org/oauth/authorize');
    connectApp.constant('LOGOUT_URL', 'http://auth.diaz.worldskills.org/logout');

    connectApp.constant('APP_ROLES', {
        ADMIN: 'Admin',
        MANAGER: 'Manager',
        USER: 'User'        
    });

})();
