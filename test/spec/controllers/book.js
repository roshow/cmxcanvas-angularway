'use strict';

describe('Controller: BookCtrl', function () {

  // load the controller's module
  beforeEach(module('angularcmxApp'));

  var BookCtrl,
    $httpBackend,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://canvasbookapi.herokuapp.com/books/rev03').respond({ balls: true });
    $httpBackend.expectGET('http://canvasbookapi.herokuapp.com/books?ids=rev01,rev02,sov01,rev03').respond([]);

    scope = $rootScope.$new();
    BookCtrl = $controller('BookCtrl', {
      $scope: scope,
      $routeParams: {
        bookId: 'rev03'
      }
    });
  }));

  it('should set default scope.embed to 400', function () {
    expect(scope.embedWidth).toBe('400');
  });

  it('should set bookId to rev03', function () {
    expect(scope.bookId).toBe('rev03');
  });

  it('should set bookData to {}', function () {
    expect(scope.bookData).toEqual({});
    $httpBackend.flush(1);
    expect(scope.bookData).toEqual({ balls: true });
  });

});
