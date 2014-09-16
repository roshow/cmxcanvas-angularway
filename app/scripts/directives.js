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
}])
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
                    scope.$watch(function() { return !!$window.twttr && !!scope.tweet; },
                        function(twttrIsReady) {
                            if (twttrIsReady) {
                                element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '">Tweet</a>');
                                $window.twttr.widgets.load(element.parent()[0]);
                            }
                        });
                }
            };
        }
    ]);