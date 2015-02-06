'use strict';

angular.module('angularcmxApp')
.value('bookList', ['rev01', 'rev02', 'sov01', 'rev03', 'rev04']) // Adding this as a value here for ease during development. Should move to app,js eventually.
.controller('BookCtrl', function ($scope, $routeParams, $location, $modal, GetLibrary, bookList, BookModel) {

    var bookModel = $scope.bookModel = new BookModel();

    $scope.embedWidth = '400';
    $scope.detailsMin = false;

    $scope.openReadMore = function (direction) {
        $scope.readMore = $scope.books[direction]();
        $scope.readMore.direction = direction;
        $scope.readMoreModal = $modal.open({
            templateUrl: 'views/partials/readMoreModal.html',
            scope: $scope
        });
        $scope.readMoreModal.result.then(function (id) {
            if (id) {
                $location.path('/books/'+id);
            }
        });
    };

    $scope.books = {};
    $scope.books.next = function () {
        var idx = ($scope.books.currentIdx + 1 === bookList.length) ? 0 : $scope.books.currentIdx + 1;
        return $scope.books.list[idx];
    };
    $scope.books.previous = function () {
        var idx = ($scope.books.currentIdx - 1 < 0) ? bookList.length - 1 : $scope.books.currentIdx - 1;
        return $scope.books.list[idx];
    };

    bookModel.get($routeParams.bookId, $routeParams.format).then(function () {
        GetLibrary(bookList).then(function (books){
            $scope.books.list = books;
            $scope.books.currentIdx = bookList.indexOf(bookModel.id);
        });
    });

})