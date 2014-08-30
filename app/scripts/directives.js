/*globals CmxCanvas, roquestAnim */

'use strict';

var crazy;
angular.module('angularcmxApp')
.directive('canvasbook', [ function (){
    return {
        restrict: 'E',
        scope: {
            bookData: '=',
            currentView: '='
        },
        templateUrl: 'views/partials/cmxcanvas.html',
        link: function(scope, element, attr){
            
            scope.canvasbook = new CmxCanvas();

            scope.canvasbook.previous = scope.canvasbook.prev;
            var moving = false;
            scope.changepanel = function(direction){
                var view = scope.canvasbook[direction]();
                if (view.then){
                    view.then(function (view){
                        if (view !== 'moving'){
                            scope.currentView = view;
                        }
                    });
                }
                else {
                    scope.currentView = view; 
                }
            };

            var $canvasEl = element.find('canvas'),
                canvasEl = $canvasEl[0];
            
            canvasEl.id = 'canvasbook';

            scope.$watch('bookData', function (newData, oldData){
                if (!angular.equals(newData, oldData)){
                    if (scope.canvasbook.currentView){
                        /** TODO: Something about currentView.panel not setting TOC buttons correctly on load unless I do it this way **/
                        scope.canvasbook.currentView.panel = 0;
                    }
                    var viewInfo = newData.view || {};
                    if (attr.$attr.animateResize){
                        var lenAnim = 400,
                            height = angular.copy(canvasEl.height),
                            width = angular.copy(canvasEl.width),
                            deltaH = (viewInfo.height || 450) - height,
                            deltaW = (viewInfo.width || 800) - width;

                        roquestAnim(function (timePassed){
                            var sinPart = Math.sin(timePassed*(Math.PI/2)/lenAnim);
                            canvasEl.height = height + (deltaH * sinPart);
                            canvasEl.width = width + (deltaW * sinPart);
                        }, lenAnim).then(function (){
                            /** TODO: Use the promise to only have on ,load, not this one AND the one beneath it **/
                            scope.canvasbook.load(newData, canvasEl.id);
                        });
                    }
                    else {
                        canvasEl.height = (viewInfo.height || 450);
                        canvasEl.width = (viewInfo.width || 800);
                        scope.canvasbook.load(newData, canvasEl.id);
                    }
                    crazy = scope.canvasbook;
                    
                    if (viewInfo.backgroundColor){
                        $canvasEl.css('background-color', viewInfo.backgroundColor);
                    }                 
                }
            });
            scope.changed = {};
            scope.changed.next = function(){
                console.log(scope.canvasbook.next());
            };
            scope.changed.prev = function(){
                console.log(scope.canvasbook.prev());
            };
        }
    };
}])
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