'use strict';

(function(){

var apiHost;
// apiHost = 'http://cmxcanvasapi.herokuapp.com';
apiHost = 'http://0.0.0.0:5000';

angular.module('angularcmxApp')
    .factory('getABook', ['$http', '$q', function($http, $q){

        return function(bookId, endpoint){
            var def = $q.defer();
            $http({
                url:  (endpoint || apiHost + '/cmx/') + bookId,
                method: 'GET',
                transformResponse: function(res){
                    res = angular.fromJson(res);
                    return res.data ? res.data[0] : res;
                }
            })
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
        var def = $q.defer();
        $http({
            url: apiHost + '/cmx',
            method: 'GET',
            transformResponse: function(res){
                return angular.fromJson(res).data;
            }
        })
            .success(function(data){
                def.resolve(data);
            }).
            error(function(data) {
                def.reject(data);
            });
        return def.promise;
    }]);

}());