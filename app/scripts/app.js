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
        controller: 'BookCtrl'
      })
      .when('/books/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'BookCtrl'
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/books'
      });
  });
