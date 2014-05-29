'use strict';

angular.module('angularcmxApp')
    .directive('cmxcanvas', function(){
        return {
            restrict: 'A',
            scope: {
                cmx: '=cmxBook',
                cmxcanvas: '=cmxcanvas'
            },
            templateUrl: 'views/partials/cmxcanvas.html',
            link: function(scope, element, attrs){
                // console.log(element.find('canvas'));

            // TO-DO: Make some sort of flag so I can put this directive on a canvas alone or a div for the everything, including the buttons.
            //  Or make them two directives.
                var canvasEl = element.find('canvas')[0];
                canvasEl.id = canvasEl.id || 'cmxcanvas';
                canvasEl.height = 450;
                canvasEl.width = 800;
                scope.$watch('cmx', function(data){
                    // console.log(data);
                    if (angular.isArray(data)){
                        scope.cmxcanvas.load(data, canvasEl.id);
                        scope.next = function(){
                            scope.cmxcanvas.next();
                        };
                        scope.prev = function(){
                            scope.cmxcanvas.prev();
                            // console.log(scope.cmxCanvas.loc);
                        };
                    }
                });
            }
        }
    });
