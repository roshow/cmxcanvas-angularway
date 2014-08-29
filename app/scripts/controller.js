'use strict';

angular.module('angularcmxApp')
    .controller('CmxCtrl', ['$scope', '$routeParams', '$location', 'GetABook', function ($scope, $routeParams, $location, getABook) {
        
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';
        $scope.cmxCanvas = new CmxCanvas();
        
        $scope.superPowerPanelChange = function(direction){
            return direction;
        };

        // $scope.watch('cmxCanvas.wasFirst', function (nval){
        //     if (nval === true){
        //         console.log('wasFirst!');
        //     }
        // });

        $scope.getBook = function(bookId, format){
            getABook(bookId, format).then(
                function (data){
                    $scope.cmxData = data;
                },
                function (error){
                    $location.path('/');
                }
            );
        };

        $scope.getBook($routeParams.bookId, $routeParams.format);

    }])
    .controller('LibraryCtrl', ['$scope', 'GetBooks', function ($scope, GetBooks){
        GetBooks.then(function (data){
            console.log(data);
            $scope.books = data;
        });
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
