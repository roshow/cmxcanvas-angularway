'use strict';

angular.module('angularcmxApp')
.factory('BookModel', function (rgModel) {

	function BookModel (data) {
        this.id = '';
        this.uri = 'http://canvasbookapi.herokuapp.com/books/';
		this.set(data);
	}

    BookModel.prototype.parseResponse = function (response) {
        return response.data[0];
    };

	rgModel.extend(BookModel);
    return BookModel;
});