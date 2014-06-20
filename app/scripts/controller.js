'use strict';

angular.module('angularcmxApp')
    .controller('CmxCtrl', ['$scope', '$routeParams', 'getCmx', function ($scope, $routeParams, getCmx) {
        
        $scope.bookId = $routeParams.bookId;

        $scope.embedWidth = '400';

        $scope.cmxCanvas = new CmxCanvas();
        $scope.urls = [
            'http://cmxcanvasapi.herokuapp.com/cmx/' + $routeParams.bookId,
            '/json/rev03Model.json',
            '/json/rev03og.json',
            '/json/sov01Model.json',
            'http://cmxcanvasapi.herokuapp.com/cmx/rev03',
        ];

        $scope.getUrl = function(url){
            getCmx(url).then(function(data){
                $scope.cmxData = data;
            });
        };

        $scope.getUrl($scope.urls[0]);

    }])
    .controller('LibraryCtrl', ['$scope', 'GetBooks', function ($scope, GetBooks){
        GetBooks.then(function(data){
            $scope.books = data;
        });
    }]);
