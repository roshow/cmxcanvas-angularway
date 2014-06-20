'use strict';

angular.module('angularcmxApp')
.directive('cmxcanvas', function(){
    return {
        restrict: 'A',
        scope: {
            cmxcanvas: '=',
            cmxBook: '='
        },
        templateUrl: 'views/partials/cmxcanvas.html',
        link: function(scope, element, attr){

            var canvasEl = element.find('canvas')[0];
            canvasEl.id = 'cmxcanvas';

            scope.$watch('cmxBook', function(newData, oldData){
                if (!angular.equals(newData, oldData)){
                    var viewInfo = newData.view || {};

                    if (attr.$attr.animateResize){
                        var lenAnim = 400,
                            height = angular.copy(canvasEl.height),
                            width = angular.copy(canvasEl.width),
                            deltaH = (viewInfo.height || 450) - height,
                            deltaW = (viewInfo.width || 800) - width;

                        roquestAnim(function(timePassed){
                            var sinPart = Math.sin(timePassed*(Math.PI/2)/lenAnim);
                            canvasEl.height = height + (deltaH * sinPart);
                            canvasEl.width = width + (deltaW * sinPart);
                        }, lenAnim).then(function (){
                            scope.cmxcanvas.load(newData, canvasEl.id);
                        });
                    }

                    else {
                        canvasEl.height = (viewInfo.height || 450);
                        canvasEl.width = (viewInfo.width || 800);
                        scope.cmxcanvas.load(newData, canvasEl.id);
                    }
                        
                }
            });
        }
    };
})
.directive('resizeCanvas', ['$window', function($window){
    return {
        restrict: 'A',
        link: function(scope, element, attr){

            var $canvasEl = element.find('canvas'),
                canvasEl = $canvasEl[0];
            var heightDiff = 109;
            var widthDiff = 2;
            var thisHeight = $window.innerHeight - heightDiff;
            var thisWidth = $window.innerWidth - widthDiff;
            canvasEl.style.zoom = thisHeight/canvasEl.height;
            // canvasEl.style.zoom = thisWidth/canvasEl.width;

            if (attr.resizeCanvas === 'responsive'){
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
}]);