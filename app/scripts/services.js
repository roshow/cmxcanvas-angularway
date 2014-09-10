'use strict';

(function(){

var apiHost;
apiHost = 'http://canvasbookapi.herokuapp.com';
// apiHost = 'http://0.0.0.0:5000';

angular.module('angularcmxApp')
    .factory('GetABook', ['$http', '$q', function($http, $q){

        return function(bookId, format){
            var def = $q.defer();
            var reqObj = {
                url:  (apiHost + '/books/') + bookId,
                method: 'GET',
                transformResponse: function(res){
                    res = angular.fromJson(res);
                    return res.data ? res.data[0] : res;
                }
            };
            if (format){
                reqObj.params = {
                    format: format
                };
            }
            $http(reqObj)
                .success(function(data){
                    def.resolve(data);
                }).
                error(function(data) {
                    def.reject(data);
                });
            return def.promise;
        };
    }])
    .factory('GetBooks', ['$http', '$q', 'myCache', function($http, $q, myCache){

        return function(bookList){
            var def = $q.defer();
            var reqObj = {
                url: apiHost + '/books',
                method: 'GET',
                transformResponse: function(res){
                    res = angular.fromJson(res).data;
                    for (var i = 0, l = res.length; i < l; i++){
                        res[i].fullTitle = res[i].series.name + ' #' + res[i].issue;
                    }
                    return res;
                }
            };
            if (bookList){
                reqObj.params = {
                    ids: bookList.join(',')
                };
            }
            $http(reqObj)
                .success(function(data){
                    myCache.put('bookListData', data);
                    def.resolve(data);
                }).
                error(function(data) {
                    def.reject(data);
                });
            return def.promise;
        };
    }])
    .factory('GetLibrary', ['$q', 'myCache', 'GetBooks', function($q, myCache, getBooks){

        return function(bookList){
            var bookListInfo = myCache.get('bookListData');
            if (!bookListInfo){
                return getBooks(bookList || false);
            }
            else {
                var def = $q.defer();
                def.resolve(bookListInfo);
                return def.promise;
            }
        };
    }]);

}());