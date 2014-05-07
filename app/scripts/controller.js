'use strict';

angular.module('angularcmxApp')
  .controller('CmxCtrl', ['$scope', 'GetCmx', function ($scope, GetCmx) {
    $scope.myname = 'cmxcanvas.js';
    $scope.cmxCanvas = new CmxCanvas();
    GetCmx.then(function(data){
        $scope.cmxData = data;
    });
    $scope.next = function(){
        $scope.cmxCanvas.next();
        console.log($scope.cmxCanvas.loc);
    };
    $scope.prev = function(){
        $scope.cmxCanvas.prev();
        // console.log($scope.cmxCanvas.loc);
    };

}]);
