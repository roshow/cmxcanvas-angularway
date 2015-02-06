'use strict';

angular.module('angularcmxApp')
.factory('BookModel', function ($rootScope, $http, $q) {

	var apiHost = 'http://canvasbookapi.herokuapp.com';

	function BookModel(data) {
		this.canvasbook = new Canvasbook();
		if (data) {
			this.setData(data);
		}
	}

	BookModel.prototype.setData = function (data) {
		angular.extend(this, data || {});
	};

	BookModel.prototype.get = function (bookId, format) {
        var deferred = $q.defer(),
        	that = this;
        $http({
            url:  (apiHost + '/books/') + bookId,
            params: !format ? undefined : {
            	format: format
            },
            method: 'GET'
        })
            .success(function (res) {
            	angular.extend(that, res.data[0]);
                $rootScope.$broadcast('bookModel:loaded', that);
                deferred.resolve(res);
            }).
            error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    };
    
    BookModel.prototype.loadUI = function (el) {
    	this.canvasbook.load(this, el);
    };

    return BookModel;
});