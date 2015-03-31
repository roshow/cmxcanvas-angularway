'use strict';
( function () {
	var app = angular.module('rgModels', []);
	app.factory('rgModel', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
		var rgmodel = {};
		rgmodel.set = function (data, value) {
	        if (typeof data === 'string') {
	            var obj = {};
	            obj[data] = value;
	            angular.extend(this, obj);
	        }
	        else {
	    		angular.extend(this, data || {});
	        }
	        return this;
		};
		rgmodel.fetch = function (options) {
	        var deferred = $q.defer(),
	        	that = this,
	        	reqObj = {
		            url:  (this.uri + this.id),
		            method: 'GET'
		        };

	        $http(angular.extend(reqObj, options || {}))
	            .success(function (res) {
	            	var parsed = that.parseResponse(res);
	            	that.set(parsed);
	                deferred.resolve(parsed);
	            }).
	            error(function (data) {
	                deferred.reject(data);
	            });
	        return deferred.promise;
	    };
	    rgmodel.parseResponse = function (data) {
	        return data;
	    };
	    rgmodel.extend = function (model) {
	    	model.prototype = angular.extend({}, this, model.prototype);
	    };
		return rgmodel;
	}]);

} () );