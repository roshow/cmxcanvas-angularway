'use strict';

angular.module('angularcmxApp')

.controller('BookCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', 'BookModel', 'BookList', 'libList', 'myCache',  function ($scope, $rootScope, $routeParams, $location, $modal, BookModel, BookList, libList, myCache) {

    $scope.bookModel = new BookModel();
    $scope.books = new BookList();

    $scope.bookId = $routeParams.bookId || 'rev04';
    $scope.bookFormat = $routeParams.format || 'classic';
    $scope.embedWidth = '400';
    $scope.detailsMin = false;

    $scope.modalOpen = false;
    $scope.onEnd = function (direction) {
        if ($scope.modalOpen === false) {
            $scope.readMore = $scope.books[direction]();
            $scope.readMore.direction = direction;
            $scope.readMoreModal = $modal.open({
                templateUrl: 'views/partials/readMoreModal.html',
                scope: $scope
            });
            $scope.modalOpen = true;            
            $scope.hotkeys = false;
            console.log($scope.readMoreModal.result);
            $scope.readMoreModal.result.then(function (id) {
                
                $scope.modalOpen = false;
                $scope.hotkeys = true;

                if (id) {
                    $location.path('/issues/'+id);
                }
                
            }).finally(function () {
                $scope.modalOpen = false;
                $scope.hotkeys = true;
            });
        }
    };

    $scope.loadBook = function (format) {
        var fetchOptions = {
            params: {
                format: format || $scope.bookFormat
            }
        };
        $scope.bookModel
            .set('id', $scope.bookId)
            .fetch(fetchOptions)
            .then(function () {
                $scope.bookModel.view.startIndex = parseInt($routeParams.startIndex || 0, 10);
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

    $scope.$on('canvasbook:changepanel', function (event, data) {
        if ($scope.modalOpen === true) {
            $scope.readMoreModal.dismiss();;
        }
    });
    $scope.$on('canvasbook:end', function (event, data) {
        $scope.onEnd(data.direction);
    });

}]);
