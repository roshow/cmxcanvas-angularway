'use strict';

angular.module('angularcmxApp')
    .directive('rolls', function() {
        return {
            restrict: 'E',
            scope: {
              myName: '=myName',
              cmxjson: '=cmxjson'
            },
            controller: 'CmxCtrl',
            templateUrl: 'views/partials/cmxcanvas.html',
            link: function(scope, element, attrs){
            } 
          };
    });
