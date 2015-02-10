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
      // .when('/books', {
      //   templateUrl: 'views/library.html',
      //   controller: 'LibraryCtrl'
      // })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'BookCtrl'
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
      .otherwise({
        redirectTo: '/'
      });
  });
