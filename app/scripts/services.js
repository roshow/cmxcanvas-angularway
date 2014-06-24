'use strict';

angular.module('angularcmxApp')
    .factory('getABook', ['$http', '$q', function($http, $q){

        function resolveImgUrlsFromModel(model){
            var L1 = model.cmxJSON.length;
            for(var i = 0; i < L1; i++) {
                model.cmxJSON[i].src = model.img.url + model.cmxJSON[i].src;
                if(model.cmxJSON[i].popups && model.cmxJSON[i].popups.length > 0) {
                    var L2 = model.cmxJSON[i].popups.length;
                    for(var j = 0; j < L2; j++) {
                        model.cmxJSON[i].popups[j].src = model.img.url + model.cmxJSON[i].popups[j].src;
                    }
                }
            }
            return model;
        }

        return function(bookId, endpoint){
            var def = $q.defer();
            console.log((endpoint || 'http://cmxcanvasapi.herokuapp.com/cmx/') + bookId);
            $http({
                url:  (endpoint || 'http://cmxcanvasapi.herokuapp.com/cmx/') + bookId,
                method: 'GET',
                transformResponse: function(data){
                    data = JSON.parse(data);
                    data = data.data ? data.data[0] : data;
                    if (data.img){
                        data = resolveImgUrlsFromModel(data);
                    }
                    return data;
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
            url: 'http://cmxcanvasapi.herokuapp.com/cmx',
            method: 'GET',
            transformResponse: function(data){
                data = JSON.parse(data).data;
                return data;
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