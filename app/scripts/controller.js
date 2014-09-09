'use strict';

angular.module('angularcmxApp')
    .controller('CmxCtrl', ['$scope', '$routeParams', '$location', 'GetABook', function ($scope, $routeParams, $location, getABook) {
        
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';

        $scope.getBook = function(bookId, format){
            getABook(bookId, format).then(
                function (data){
                    $scope.bookData = data;
                },
                function (error){
                    $location.path('/');
                }
            );
        };


        $scope.getBook($routeParams.bookId, $routeParams.format);

        $scope.hideOverlay = function(){
            if ($scope.currentView === 'wasFirst'){
                $scope.currentView = 'firstPanel';
            }
            else if ($scope.currentView === 'wasLast'){
                $scope.currentView = 'lastPanel';
            }
        };

        $scope.veryTempBookIdHash = {
            'sov01': 'Sovereign #1',
            'rev01': 'Revenger #1',
            'rev02': 'Revenger #2',
            'rev03': 'Revenger #3'
        };

    }])
    .controller('LibraryCtrl', ['$scope', 'GetBooks', function ($scope, GetBooks){
        GetBooks.then(function (data){
            $scope.books = data;
        });
    }])
    .controller('EmbedCtrl', ['$scope', '$routeParams', '$location', 'GetABook', function ($scope, $routeParams, $location, getABook) {
        
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';

        $scope.getBook = function(bookId, format){
            getABook(bookId, format).then(
                function (data){
                    $scope.bookData = data;
                },
                function (error){
                    $location.path('/');
                }
            );
        };


        $scope.getBook($routeParams.bookId, $routeParams.format);

        $scope.hideOverlay = function(){
            if ($scope.currentView === 'wasFirst'){
                $scope.currentView = 'firstPanel';
            }
            else if ($scope.currentView === 'wasLast'){
                $scope.currentView = 'lastPanel';
            }
        };

        $scope.veryTempBookIdHash = {
            'sov01': 'Sovereign #1',
            'rev01': 'Revenger #1',
            'rev02': 'Revenger #2',
            'rev03': 'Revenger #3'
        };

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
