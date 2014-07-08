'use strict';
  
angular.module('angularcmxApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch'
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
      .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoCtrl'
      })
      .when('/beth', {
        templateUrl: 'views/beth.html',
        controller: 'BethCtrl'
      })

      .when('/dev/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'DevCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
