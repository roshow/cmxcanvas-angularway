'use strict';

angular.module('angularcmxApp')
.controller('BookCtrl', function ($scope, $rootScope, $routeParams, $location, $modal, bookList, BookModel, BookList, myCache) {

    angular.extend($scope, {

        bookModel: new BookModel(),
        books: new BookList(),

        bookId: $routeParams.bookId || 'rev04',
        bookFormat: $routeParams.format || 'classic',
        embedWidth: '400',
        detailsMin: false,

        openReadMore: function (direction) {
            this.readMore = this.books[direction]();
            this.readMore.direction = direction;
            this.readMoreModal = $modal.open({
                templateUrl: 'views/partials/readMoreModal.html',
                scope: this
            });
            this.readMoreModal.result.then(function (id) {
                if (id) {
                    $location.path('/books/'+id);
                }
            });
        },

        loadBook: function (format) {
            var book = this.bookModel;
            book
                .set('id', $scope.bookId)
                .fetch({
                    params: { format: format || $scope.bookFormat }
                })
                .then(function () {
                    $rootScope.$broadcast('bookModel:loaded', book);
                });
        },

        loadBookList: function () {
            var books = $scope.books;
            books.set({
                list: myCache.get('bookListData'),
                currentIdx: bookList.indexOf($scope.bookId)
            });
            if (!books.list) {
                books.fetch({
                    params: { ids: bookList.join(',') }
                }).then(function (list) {
                    myCache.put('bookListData', books.list);
                });
            }
        }
    });
    
    $scope.loadBook();
    $scope.loadBookList();

});
