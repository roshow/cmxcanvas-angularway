'use strict';
  
angular.module('angularcmxApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap'
])
  .factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/books', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl'
      })
      .when('/cmx/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'CmxCtrl'
      })
      .when('/books/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'CmxCtrl'
      })
      .when('/embed/:bookId', {
        templateUrl: 'views/iframe.html',
        controller: 'EmbedCtrl'
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
        redirectTo: '/books/cj00'
      });
  });
