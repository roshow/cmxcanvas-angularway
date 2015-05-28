'use strict';

angular.module('angularcmxApp')

.controller('BookCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$modal', 'BookModel', 'BookList', 'libList', 'myCache',  function ($scope, $rootScope, $routeParams, $location, $modal, BookModel, BookList, libList, myCache) {

    angular.extend($scope, {
        bookModel: new BookModel(),
        books: new BookList(),
        bookId: $routeParams.bookId || 'rev04',
        bookFormat: $routeParams.format || 'classic',
        startIndex: $routeParams.startIndex ? ($routeParams.startIndex - 1) : 0,
        embedWidth: '400',
        detailsMin: false,
        modalOpen: false,
        hotkeys: true
    });

    function openModal () { // TODO: move this to a directive that shares scope and listens to $scope.modalOpen = true/false
        var modal = $modal.open({
            templateUrl: 'views/partials/readMoreModal.html',
            scope: $scope
        });

        $scope.modalOpen = true;            
        $scope.hotkeys = false;

        modal.result.then(function (id) {
            $scope.modalOpen = false;
            $scope.hotkeys = true;

            if (id) {
                $location.url('/issues/'+id);
            }
            
        }).finally(function () {
            $scope.modalOpen = false;
            $scope.hotkeys = true;
        });

        $scope.readMoreModal = modal;
        return  $scope.readMoreModal;
    }

    $scope.onEnd = function (direction) {
        if ($scope.modalOpen === false) {
            $scope.readMore = $scope.books[direction]();
            $scope.readMore.direction = direction;
            openModal();
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
                $scope.bookModel.view.startIndex = parseInt($scope.startIndex, 10);
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


    /* Listeners */

    $scope.$on('canvasbook:changepanel', function () {
        if ($scope.modalOpen === true) {
            $scope.readMoreModal.dismiss();
        }
    });

    $scope.$on('canvasbook:end', function (event, data) {
        $scope.onEnd(data.direction);
    });

}]);
