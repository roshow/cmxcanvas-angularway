'use strict';

angular.module('angularcmxApp')
    .factory('getCmx', function($http, $q){
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
        return function(cmxUrl){
            var def = $q.defer();
            $http({
                url: cmxUrl || '/json/sov01Model.json',
                // url: 'http://cmxcanvasapi.herokuapp.com/cmx/rev03',
                method: 'GET',
                transformResponse: function(data){
                    data = JSON.parse(data);
                    data = data.data ? data.data[0] : data;
                    if (data.img){
                        data = resolveImgUrlsFromModel(data);
                    }
                    // console.log(data);
                    return data;
                }
            }).success(function(data){
                def.resolve(data);
            });
            return def.promise;
        }
    })
    .factory('GetBooks', function($http, $q){
        var def = $q.defer();
        $http({
            url: 'http://cmxcanvasapi.herokuapp.com/cmx',
            method: 'GET',
            transformResponse: function(data){
                data = JSON.parse(data).data;
                return data;
            }
        }).success(function(data){
            def.resolve(data);
        });
        return def.promise;
    });