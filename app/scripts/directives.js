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
                console.log(attrs);

            // TO-DO: Make some sort of flag so I can put this directive on a canvas alone or a div for the everything, including the buttons.
            //  Or make them two directives.

                var canvasEl = element.find('canvas')[0];
                canvasEl.id = 'cmxcanvas';

                // canvasEl.height = attrs.height || 450;
                // canvasEl.width= attrs.width || 800;

                attrs.$observe('initHeight', function (newVal, oldVal){
                    if (!oldVal){
                        canvasEl.height = newVal || 450;
                    }
                });
                attrs.$observe('initWidth', function (newVal, oldVal){
                    if (!oldVal){
                        canvasEl.width = newVal || 800;
                    }
                });

                scope.$watch('cmx', function(data){
                    if (angular.isArray(data)){
                        scope.cmxcanvas.load(data, canvasEl.id);
                        scope.next = function(){
                            scope.cmxcanvas.next();
                        };
                        scope.prev = function(){
                            scope.cmxcanvas.prev();
                        };
                    }
                });

                if (attrs.$attr.resize){
                    var heightDiff = 109;
                    var widthDiff = 2;
                    var thisHeight = $window.innerHeight - heightDiff;
                    var thisWidth = $window.innerWidth - widthDiff;
                    canvasEl.style.zoom = thisHeight/canvasEl.height;
                    // canvasEl.style.zoom = thisWidth/canvasEl.width;

                    if (attrs.$attr.responsive){
                        angular.element($window).on('resize', function(){
                            var thisHeight = $window.innerHeight - heightDiff;
                            var thisWidth = $window.innerWidth - widthDiff;
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