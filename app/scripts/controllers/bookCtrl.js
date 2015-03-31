'use strict';

angular.module('angularcmxApp')

.controller('BookCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', 'BookModel', 'BookList', 'libList', 'myCache', 
    function ($scope, $rootScope, $routeParams, $location, $modal, BookModel, BookList, libList, myCache) {

    $scope.bookModel = new BookModel();
    $scope.books = new BookList();

    $scope.bookId = $routeParams.bookId || 'rev04';
    $scope.bookFormat = $routeParams.format || 'classic';
    $scope.embedWidth = '400';
    $scope.detailsMin = false;

    $scope.onEnd = function (direction) {
        $scope.readMore = $scope.books[direction]();
        $scope.readMore.direction = direction;
        $scope.readMoreModal = $modal.open({
            templateUrl: 'views/partials/readMoreModal.html',
            scope: $scope
        });
        $scope.readMoreModal.result.then(function (id) {
            if (id) {
                $location.path('/issues/'+id);
            }
        });
    };

    $scope.loadBook = function (format) {
        $scope.bookModel
            .set('id', $scope.bookId)
            .fetch({
                params: { format: format || $scope.bookFormat }
            });
    };

    $scope.loadBookList = function () {
        var books = $scope.books;
        books.set({
            list: myCache.get('bookListData'),
            currentIdx: libList.indexOf($scope.bookId)
        });
        if (!books.list) {
            books
                .fetch({
                    params: { ids: libList.join(',') }
                }).then(function () {
                    myCache.put('bookListData', books.list);
                });
        }
    };
    
    $scope.loadBook();
    $scope.loadBookList();

}]);
