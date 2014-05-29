'use strict';
  
angular.module('angularcmxApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl'
      })
      .when('/cmx/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'CmxCtrl'
      })
      .when('/embed/:bookId', {
        templateUrl: 'views/iframe.html',
        controller: 'CmxCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
