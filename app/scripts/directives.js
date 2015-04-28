/*globals Canvasbook */

'use strict';

angular.module('angularcmxApp')
.directive('canvasbook', function ($rootScope, $document){
    return {
        restrict: 'EA',
        templateUrl: '/views/partials/canvasbook.html',
        replace: true,
        scope: {
            viewModel: '=',
            bookId: '=',
            bookFormat: '='
        },
        link: function(scope, element, attrs){
            
            var canvasEl = element.find('canvas')[0],
                canvasbook = scope.canvasbook = Canvasbook();

            // console.log(element.getBoundingClientRect());

            scope.changepanel = function (direction) {
                var noMore = ( direction === 'next' ) ? canvasbook.isLast : canvasbook.isFirst;
                var eventName = 'canvasbook:';
                if (!noMore){
                    canvasbook[direction]();
                    document.querySelector('body').scrollIntoView();
                    eventName += 'changepanel';
                }
                else {
                    eventName += 'end';
                }
                $rootScope.$broadcast(eventName, { direction: direction, currentIndex: canvasbook.currentIndex });
            };

            scope.$watch('viewModel', function (newVal) {
                if (newVal) {
                    canvasEl.height = (newVal.height || 450);
                    canvasEl.width = (newVal.width || 800);
                    canvasbook.load(newVal, canvasEl);
                }
            });

            if (attrs.$attr.hotkeys) {
                $document.on('keydown', function (e) {
                    if (attrs.hotkeys !== 'false') {
                        switch (e.keyCode) {
                            case 39:
                                document.querySelector('.forward').click();
                                break;
                            case 37:
                                document.querySelector('.backward').click();
                                break;
                        }
                    }
                });
            }
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
}])
.directive('socialShare', function ($window) {
    return {
        restrict: 'AC',
        link: function (scope, element) {
            var el = element[0];

            scope.$watch('bookModel.view', function (newVal, oldVal) {
                
                if (newVal !== oldVal) {

                    element.empty();

                    var model = scope.bookModel,
                        url = 'http://revengercomic.com/issues/' + model.id,
                        // url = 'http://roshow.net/issues/'+ model.id,
                        // url = 'http://canvasbook.surge.sh',
                        fullTitle = model.series.name + ' ' + model.issue + ': ' + model.title,
                        thumb = model.thumb;

                    $window.stWidget.addEntry({
                        service:'twitter',
                        element: el,
                        url: url,
                        title: fullTitle,
                        type:'large',
                        image: thumb
                    });
                    $window.stWidget.addEntry({
                        service:'facebook',
                        element: el,
                        url: url,
                        title: fullTitle,
                        type:'large',
                        image: thumb
                    });
                }
            });
            
        }
    }
})
;