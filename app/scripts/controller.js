'use strict';

angular.module('angularcmxApp')
    .controller('CmxCtrl', ['$scope', '$routeParams', 'getCmx', function ($scope, $routeParams, getCmx) {
        $scope.myname = 'cmxcanvas.js';
        $scope.cmxCanvas = new CmxCanvas();
        var cmxUrl = $routeParams.bookId ? 'http://cmxcanvasapi.herokuapp.com/cmx/' + $routeParams.bookId : undefined;
        getCmx(cmxUrl).then(function(data){
            console.log(data);
            $scope.cmxData = data;
        });
        $scope.next = function(){
            $scope.cmxCanvas.next();
        };
        $scope.prev = function(){
            $scope.cmxCanvas.prev();
            // console.log($scope.cmxCanvas.loc);
        };

    }])
    .controller('LibraryCtrl', ['$scope', 'GetBooks', function ($scope, GetBooks){
        GetBooks.then(function(data){
            $scope.books = data;
        });
    }]);
