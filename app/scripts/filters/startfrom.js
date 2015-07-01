'use strict';

/**
 * @ngdoc filter
 * @name connectApp.filter:startFrom
 * @function
 * @description
 * # startFrom
 * Filter in the connectApp.
 */
angular.module('connectApp')
  .filter('startFrom', function () {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
  });
