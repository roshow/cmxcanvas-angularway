'use strict';

angular.module('angularcmxApp')
  .controller('CmxCtrl', function ($scope, GetCmx) {
    $scope.myname = 'cmxcanvas.js';
    $scope.cmxjson = {
        name: 'rolando',
        balls: 'big'
    }
    $scope.i = 0;
    GetCmx.then(function(data){
        $scope.cmxjson = data.data.cmxJSON;
        $scope.i++;
    });
  });
