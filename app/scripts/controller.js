'use strict';

angular.module('angularcmxApp')
    .controller('CmxCtrl', ['$scope', '$routeParams', 'getCmx', function ($scope, $routeParams, getCmx) {
        
        $scope.bookId = $routeParams.bookId;

        $scope.embedWidth = '400';

        $scope.cmxCanvas = new CmxCanvas();
        var cmxUrl = $routeParams.bookId ? 'http://cmxcanvasapi.herokuapp.com/cmx/' + $routeParams.bookId : undefined;
        getCmx(cmxUrl).then(function(data){
            $scope.cmxData = data;
        });

        // console.log($scope.cmxCanvas);

    }])
    .controller('LibraryCtrl', ['$scope', 'GetBooks', function ($scope, GetBooks){
        GetBooks.then(function(data){
            $scope.books = data;
        });
    }]);
