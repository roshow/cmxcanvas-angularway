/*globals CmxCanvas, roquestAnim */

'use strict';

angular.module('angularcmxApp')
.directive('canvasbook', function (){
    return {
        restrict: 'EA',
        templateUrl: '/views/partials/canvasbook.html',
        replace: true,
        link: function(scope, element, attr){
            
            var canvasEl = element.find('canvas')[0];
            canvasEl.id = canvasEl.id || 'canvasbook';

            scope.changepanel = function (direction) {
                var noMore = ( direction === 'next' ) ? scope.bookModel.canvasbook.isLast : scope.bookModel.canvasbook.isFirst;
                if (!noMore){
                    scope.bookModel.canvasbook[direction]();
                }
                else {
                    scope.openReadMore(direction);
                }
            };

            scope.$on('bookModel:loaded', function (event, bookModel) {
                canvasEl.height = (bookModel.view.height || 450);
                canvasEl.width = (bookModel.view.width || 800);
                bookModel.loadUI(canvasEl.id);
            });

        }
    };
})
.directive('resizeCanvas', function($window){
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
})
 .directive('fbLike', [
        '$window', function($window) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    // wait for facebook api to load before displaying like button
                    scope.$watch(function() { return !!$window.FB; },
                        function(fbIsReady) {
                            if (fbIsReady) {
                                element.html('<div class="fb-like" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
                                $window.FB.XFBML.parse(element.parent()[0]);
                            }
                        });
                }
            };
        }
    ])
    .directive('googlePlus', [
        '$window', function($window) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    // wait for google api to load before displaying plus button
                    scope.$watch(function() { return !!$window.gapi; },
                        function(gapiIsReady) {
                            if (gapiIsReady) {
                                element.html('<div class="g-plusone" data-size="medium"></div>');
                                $window.gapi.plusone.go(element.parent()[0]);
                            }
                        });
                }
            };
        }
    ])
    .directive('pinIt', [
        '$window', '$location',
        function($window, $location) {
            return {
                restrict: 'A',
                scope: {
                    pinIt: '=',
                    pinItImage: '='
                },
                link: function(scope, element, attrs) {
                    // wait for pinterest api to load and scope data to bind before displaying pin it button
                    scope.$watch(function() { return !!$window.parsePins && !!scope.pinIt; },
                        function(pinterestIsReady) {
                            if (pinterestIsReady) {
                                scope.pinItUrl = $location.absUrl();
                                element.html('<a href="//www.pinterest.com/pin/create/button/?url=' + scope.pinItUrl + '&media=' + scope.pinItImage + '&description=' + scope.pinIt + '" data-pin-do="buttonPin" data-pin-config="beside"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" /></a>');
                                $window.parsePins(element.parent()[0]);
                            }
                        });
                }
            };
        }
    ])
    .directive('tweet', [
        '$window', function($window) {
            return {
                restrict: 'A',
                scope: {
                    tweet: '='
                },
                link: function(scope, element, attrs) {
                    // wait for twitter api to load and scope data to bind before displaying tweet button
                    scope.$watch(function () { return !!$window.twttr && !!scope.tweet; },
                        function (twttrIsReady) {
                            if (twttrIsReady) {
                                element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '">Tweet</a>');
                                $window.twttr.widgets.load(element.parent()[0]);
                            }
                        });
                }
            };
        }
    ]);