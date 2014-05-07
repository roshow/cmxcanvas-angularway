'use strict';

angular.module('angularcmxApp')
    .directive('cmx', function(){
        return function(scope, element, attrs){
            var canvasEl = element[0];
            canvasEl.id = canvasEl.id || 'whateverIWant';
            canvasEl.height = 450;
            canvasEl.width = 800;
            scope.$watch(attrs.cmx, function(data){
                scope.$parent.cmxCanvas.load(data, canvasEl.id);
            });
        };
    });
    // .directive('cmxcanvas', function() {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             load: '=load',
    //             cmxjson: '=cmxjson'
    //         },
    //         controller: 'CmxCtrl',
    //         templateUrl: 'views/partials/cmxcanvas.html',
    //         link: function(scope, element, attrs){
    //             console.log(element);
    //             scope.$watch('cmxjson', function(data){
    //                 console.log(scope.load);
    //                 scope.load(data, 'thisCanvas');
    //                 // var cmxCanvas = new CmxCanvas(data, 'thisCanvas');
    //                 // scope.next = cmxCanvas.next;
    //                 // scope.prev = cmxCanvas.prev;
    //             });
    //             scope.next = function(){
    //                 alert('neeeeext');
    //             };
    //         }
    //     }
    // })
