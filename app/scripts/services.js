'use strict';

(function(){

var apiHost, bookList;

// apiHost = 'http://cmxcanvasapi.herokuapp.com';
apiHost = 'http://0.0.0.0:5000';

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
    .factory('GetBooks', ['$http', '$q', function($http, $q){
        // var def = $q.defer();
        // $http({
        //     url: apiHost + '/books',
        //     method: 'GET',
        //     params: ,
        //     transformResponse: function(res){
        //         return angular.fromJson(res).data;
        //     }
        // })
        //     .success(function(data){
        //         def.resolve(data);
        //     }).
        //     error(function(data) {
        //         def.reject(data);
        //     });
        // return def.promise;

        return function(bookList){
            var def = $q.defer();
            var reqObj = {
                url: apiHost + '/books',
                method: 'GET',
                transformResponse: function(res){
                    return angular.fromJson(res).data;
                }
            };
            if (bookList){
                reqObj.params = {
                    ids: bookList.join(',')
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
    }]);

}());