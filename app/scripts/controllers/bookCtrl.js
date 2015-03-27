'use strict';

angular.module('angularcmxApp')
.controller('BookCtrl', function ($scope, $rootScope, $routeParams, $location, $modal, bookList, BookModel, BookList, myCache) {

    var bookModel = $scope.bookModel = new BookModel();
    var books = $scope.books = new BookList();

    $scope.bookId = $routeParams.bookId || 'rev04';
    $scope.bookFormat = $routeParams.format || 'classic';
    $scope.embedWidth = '400';
    $scope.detailsMin = false;

    $scope.openReadMore = function (direction) {
        $scope.readMore = books[direction]();
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

    $scope.loadBook = function (format) {
        bookModel.set('id', $scope.bookId).fetch({
            params: { format: format || $scope.bookFormat }
        }).then(function () {
            $rootScope.$broadcast('bookModel:loaded', bookModel);
        });
    };
    $scope.loadBook();
    
    books.set({
        list: myCache.get('bookListData'),
        currentIdx: bookList.indexOf($scope.bookId)
    });
    if (!books.list) {
        books.fetch({
            params: { ids: bookList.join(',') }
        }).then(function () {
            myCache.put('bookListData', $scope.books.list);
        });
    }

});