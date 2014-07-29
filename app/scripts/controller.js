'use strict';

angular.module('angularcmxApp')
    .controller('CmxCtrl', ['$scope', '$routeParams', '$location', 'getABook', function ($scope, $routeParams, $location, getABook) {
        
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';
        $scope.cmxCanvas = new CmxCanvas();
        $scope.getUrl = function(bookId){
            getABook(bookId).then(
                function (data){
                    $scope.cmxData = data;
                },
                function (error){
                    $location.path('/');
                }
            );
        };
        $scope.getUrl($routeParams.bookId);

    }])
    .controller('LibraryCtrl', ['$scope', 'GetBooks', function ($scope, GetBooks){
        GetBooks.then(function (data){
            $scope.books = data;
        });
    }])
    .controller('DemoCtrl', ['$scope', 'getABook', function ($scope, getABook) {
        
        $scope.cmxCanvas = new CmxCanvas();
        $scope.getBook = function(bookId){
            var url;
            // url = '/json/';
            // bookId += (url ? '.json' : '');
            getABook(bookId, url).then(function (data){
                $scope.cmxData = data;
                console.log($scope.cmxData.id);
            });
        };
        $scope.getBook('rev03dig');

    }])
    .controller('DevCtrl', ['$scope', '$routeParams', '$location', 'getABook', function ($scope, $routeParams, $location, getABook) {
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';
        $scope.cmxCanvas = new CmxCanvas();
        $scope.getUrl = function(bookId){
            var url;
            if ($routeParams.api !== "1"){
                bookId += '.json';
                url = '/json/';
            }
            getABook(bookId, url).then(
                function(data){
                    $scope.cmxData = data;
                },
                function(error){
                    console.log(error);
                    $location.path('/');
                }
            );
        };
        $scope.getUrl($routeParams.bookId);

    }])
    .controller('BethCtrl', ['$scope', 'getABook', function ($scope, getABook) {
        var url;
        $scope.cmxCanvas = new CmxCanvas();
        $scope.getBook = function(bookId){
            // var url = '/json/';
            // bookId += '.json';
            getABook(bookId, url).then(function (data){
                $scope.cmxData = data;
            });
        };
        $scope.getBook('bethforever');

    }]);
