'use strict';

angular.module('angularcmxApp')
    .directive('cmxcanvas', function(){
        return {
            restrict: 'A',
            scope: {
                cmx: '=cmxBook',
                cmxcanvas: '=cmxcanvas'
            },
            // template: '<canvas></canvas>',
            link: function(scope, element, attrs){
                // console.log(element);
                var canvasEl = element[0];
                canvasEl.id = canvasEl.id || 'cmxcanvas';
                canvasEl.height = 450;
                canvasEl.width = 800;
                scope.$watch('cmx', function(data){
                    // console.log(data);
                    if (angular.isArray(data)){
                        scope.cmxcanvas.load(data, canvasEl.id);
                    }
                });
            }
        }
    });
