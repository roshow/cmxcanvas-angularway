'use strict';

angular.module('angularcmxApp')
    .value('bookList', ['rev01', 'rev02', 'sov01', 'rev03']) // Adding this as a value here for ease during development. Should move to app,js eventually.
    .controller('CmxCtrl', ['$scope', '$routeParams', '$location', 'myCache', 'GetABook', 'GetBooks', 'bookList', function ($scope, $routeParams, $location, myCache, getABook, getBooks, bookList) {
        
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';

        $scope.getBook = function(bookId, format){
            getABook(bookId, format).then(
                function (data){
                    $scope.bookData = data;
                    $scope.currentBook = bookList.indexOf(data.id);
                    var plusone = $scope.currentBook + 1,
                        minusone = $scope.currentBook - 1;
                    $scope.nextBook = (plusone === bookList.length) ? 0 : plusone;
                    $scope.previousBook = (minusone < 0) ? bookList.length - 1 : minusone;
                },
                function (error){
                    $location.path('/');
                }
            );
        };

        $scope.getBook($routeParams.bookId, $routeParams.format);

        // Temporary way of making sure each book detail has all bookListData
        var bookListInfo = myCache.get('bookListData');
        if (!bookListInfo){
            getBooks(bookList || false).then(function (data){
                $scope.books = data;
            });
        }
        else if (!$scope.books){
            $scope.books = bookListInfo;
        }

        $scope.hideOverlay = function(){
            if ($scope.currentView === 'wasFirst'){
                $scope.currentView = 'firstPanel';
            }
            else if ($scope.currentView === 'wasLast'){
                $scope.currentView = 'lastPanel';
            }
        };

    }])
    .controller('LibraryCtrl', ['$scope','GetBooks','bookList', function ($scope, getBooks, bookList){
        getBooks(bookList || false).then(function (data){
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
            getABook(bookId, url).then(function (data){
                $scope.cmxData = data;
            });
        };
        $scope.getBook('bethforever');

    }]);
