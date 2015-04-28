'use strict';

angular.module('angularcmxApp')
.controller('LibraryCtrl', ['$scope','GetBooks','bookList', function ($scope, getBooks, bookList){
    getBooks(bookList || false).then(function (data){
        $scope.books = data;
    });
}])
.controller('EmbedCtrl', ['$scope', '$routeParams', '$location', 'GetABook', function ($scope, $routeParams, $location, GetABook) {
    
    $scope.bookId = $routeParams.bookId;
    $scope.embedWidth = '400';

    $scope.getBook = function(bookId, format){
        GetABook(bookId, format).then(
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
}]);

