/*globals Canvasbook */

'use strict';

angular.module('angularcmxApp')
.directive('canvasbook', function (){
    return {
        restrict: 'EA',
        templateUrl: '/views/partials/canvasbook.html',
        replace: true,
        scope: {
            viewModel: '=',
            onEnd: '&'
        },
        link: function(scope, element){
            
            var canvasEl = element.find('canvas')[0],
                canvasbook = new Canvasbook();

            scope.changepanel = function (direction) {
                var noMore = ( direction === 'next' ) ? canvasbook.isLast : canvasbook.isFirst;
                if (!noMore){
                    canvasbook[direction]();
                }
                else if (typeof scope.onEnd === 'function') {
                    scope.onEnd({
                        direction: direction
                    });
                }
            };

            scope.$watch('viewModel', function (newVal) {
                if (newVal) {
                    canvasEl.height = (newVal.height || 450);
                    canvasEl.width = (newVal.width || 800);
                    canvasbook.load(newVal, canvasEl);
                }
            });
        }
    };
})
.directive('resizeCanvas', [ '$window', function ($window){
    return {
        restrict: 'A',
        link: function(scope, element, attr){

            var $canvasEl = element.find('canvas'),
                canvasEl = $canvasEl[0];
            
            var heightDiff = 109;
            var widthDiff = 2;
            var thisHeight = $window.innerHeight - heightDiff;
            var thisWidth = $window.innerWidth - widthDiff;

            if (thisWidth/thisHeight >= 16/9){
                canvasEl.style.zoom = thisHeight/canvasEl.height;
            }
            else {
                canvasEl.style.zoom = thisWidth/canvasEl.width;
            }

            if (attr.resizeCanvas === 'responsive'){
                angular.element($window).on('resize', function(){
                    var thisHeight = $window.innerHeight - heightDiff;
                    var thisWidth = $window.innerWidth - widthDiff;

                    if (thisWidth/thisHeight >= 16/9){
                        canvasEl.style.zoom = thisHeight/canvasEl.height;
                    }
                    else {
                        canvasEl.style.zoom = thisWidth/canvasEl.width;
                    }
                });
            }
        }
    };
}]);