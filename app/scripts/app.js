'use strict';
  
angular.module('angularcmxApp', [
  'ngResource',
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap',
  'rgModels'
])
  
  .value('libList', ['rev01', 'rev02', 'sov01', 'rev03', 'rev04'])

  .factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
  })
  .config(function ($routeProvider, $locationProvider) {
    var html5Mode = false;

    // html5Mode = true;

    $locationProvider.html5Mode(html5Mode);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'BookCtrl'
      })
      .when('/cmx/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'BookCtrl'
      })
      .when('/issues/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'BookCtrl'
      })
      .when('/issues/:bookId/:startIndex', {
        templateUrl: 'views/main.html',
        controller: 'BookCtrl'
      })
      .when('/embed/:bookId', {
        templateUrl: 'views/iframe.html',
        controller: 'EmbedCtrl'
      })
      // .when('/books', {
      //   templateUrl: 'views/library.html',
      //   controller: 'LibraryCtrl'
      // })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
