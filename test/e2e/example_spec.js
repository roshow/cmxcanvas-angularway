'use strict';

describe('CanvasBook App', function() {

  it('should redirect index.html to index.html#/books', function() {
    browser.get('/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/books');
      });
  });

});

describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('#/books/rev03');
    });

    it('should load some books', function (){
      var books = element.all(by.repeater('book in books'));
      element.all(by.css('li.dropdown')).first().click();
      books.first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/books/rev01');
      });
    });

});