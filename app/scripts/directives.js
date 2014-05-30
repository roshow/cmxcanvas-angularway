'use strict';

angular.module('angularcmxApp')
    .directive('cmxcanvas', [ '$window', function($window){
        return {
            restrict: 'A',
            scope: {
                cmx: '=cmxBook',
                cmxcanvas: '=cmxcanvas',
                resize: '=',
                responsive: '='
            },
            templateUrl: 'views/partials/cmxcanvas.html',
            link: function(scope, element, attrs){
                // console.log(element.find('canvas'));
                console.log(attrs.$attr.resize);

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

                if (attrs.$attr.resize){
                    var thisWidth = $window.innerWidth;
                    canvasEl.style.zoom = thisWidth/canvasEl.width;

                    if (attrs.$attr.responsive){
                        angular.element($window).on('resize', function(){
                            var thisHeight = $window.innerHeight - 130;
                            var thisWidth = $window.innerWidth;
                            // canvasEl.style.zoom = thisHeight/canvasEl.height;

                            if (thisWidth/thisHeight >= 16/9){
                                canvasEl.style.zoom = thisHeight/canvasEl.height;
                            }
                            else {
                                canvasEl.style.zoom = thisWidth/canvasEl.width;
                            }
                        });
                    }
                }
            }
        };
    }]);
