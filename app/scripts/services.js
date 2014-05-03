'use strict';

angular.module('angularcmxApp')
    .factory('GetCmx', function($http, $q){
        var def = $q.defer();
        return $http({
            url: '/json/sov01Model.json',
            method: 'GET',
            transformResponse: function(data){
                return JSON.parse(data);
              }
          }).success(function(data){
                def.resolve(data);
          });
          return def.promise();
      });