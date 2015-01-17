'use strict';

angular.module('angularcmxApp')
    .value('bookList', ['rev01', 'rev02', 'sov01', 'rev03', 'rev04']) // Adding this as a value here for ease during development. Should move to app,js eventually.
    // .value('bookList', false)
    .controller('CmxCtrl', ['$scope', '$routeParams', '$location', '$modal', 'myCache', 'GetABook', 'GetLibrary', 'bookList', function ($scope, $routeParams, $location, $modal, myCache, getABook, getLibrary, bookList) {
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.open = function (view, size) {
                var bookIdx = view === 'wasLast' ? $scope.nextBook : $scope.previousBook;
                var book = $scope.books[bookIdx];
                var modalInstance = $modal.open({
                  templateUrl: 'myModalContent.html',
                  controller: 'ModalInstanceCtrl',
                  size: size,
                  resolve: {
                    view: function () {
                      return view;
                    },
                    book: function () {
                        return book;
                    }
                  }
                });

                modalInstance.result.then(function (selectedItem) {
                  $scope.selected = selectedItem;
                }, function () {
                  // $log.info('Modal dismissed at: ' + new Date());
                });
        };
        $scope.bookId = $routeParams.bookId;
        $scope.embedWidth = '400';
        $scope.bookData = {};
        $scope.detailsMin = false;

        $scope.getBook = function(bookId, format){
            return getABook(bookId, format).then(
                function (data){
                    $scope.bookData = data;
                    return data;
                },
                function (error){
                    return $location.path('/');
                }
            );
        };

        // var bookList;
        $scope.getBook($routeParams.bookId, $routeParams.format).then(function (data){
            getLibrary(bookList).then(function (books){
                $scope.books = books;
                bookList = bookList || books.map(function (book){
                    return book.id;
                });
                $scope.selectABook = data.id;
                $scope.currentBook = bookList.indexOf(data.id);
                var plusone = $scope.currentBook + 1,
                    minusone = $scope.currentBook - 1;
                $scope.nextBook = (plusone === bookList.length) ? 0 : plusone;
                $scope.previousBook = (minusone < 0) ? bookList.length - 1 : minusone;
            });
            
        });

        $scope.hideOverlay = function(){
            if ($scope.currentView === 'wasFirst'){
                $scope.currentView = 'firstPanel';
            }
            else if ($scope.currentView === 'wasLast'){
                $scope.currentView = 'lastPanel';
            }
        };

        $scope.$watch('selectABook', function (newVal, oldVal){
            if (newVal && newVal !== $scope.bookData.id){
                $location.path('/books/' + newVal);
            }
        });
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
    .controller('BethCtrl', ['$scope', 'getABook', function ($scope, getABook) {
        var url;
        $scope.cmxCanvas = new CmxCanvas();
        $scope.getBook = function(bookId){
            getABook(bookId, url).then(function (data){
                $scope.cmxData = data;
            });
        };
        $scope.getBook('bethforever');
    }])

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $location, view, book) {
  $scope.view = view;
  $scope.book = book;

  $scope.ok = function (id) {
    $modalInstance.close();
    $location.path('/books/'+id);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});