'use strict';
angular.module('angularcmxApp')
.factory('BookList', ['$http', '$q', 'myCache', 'rgModel', function ($http, $q, myCache, rgModel) {

	function BookList (data) {
		this.id = '';
		this.list = [];
		this.currentIdx = 0;
		this.uri = '//canvasbookapi.herokuapp.com/books';
		this.set(data);
	}

	BookList.prototype.parseResponse = function (response) {
		var data = response.data;
        for (var i = data.length; i--;){
            data[i].fullTitle = data[i].series.name + ' #' + data[i].issue;
        }
        return { list: data };
	};
    BookList.prototype.next = function () {
        var idx = (this.currentIdx + 1 === this.list.length) ? 0 : this.currentIdx + 1;
        return this.list[idx];
    };
    BookList.prototype.previous = function () {
        var idx = (this.currentIdx - 1 < 0) ? this.list.length - 1 : this.currentIdx - 1;
        return this.list[idx];
    };
    
    rgModel.extend(BookList);

    return BookList;
}]);