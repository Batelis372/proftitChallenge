'use strict';
 
angular.module('Book')
.factory('SpecificBookService',  function ($resource) {
    return {
 query: function(id, callback) {
          return $resource('https://www.googleapis.com/books/v1/volumes/'+id, {}, {
                 query: { method: 'JSONP'}
          }).query().$promise.then(function(response){ callback(response)});
    
        }
      }
})
.factory('BookService', function ($resource) {
    return $resource('https://www.googleapis.com/books/v1/volumes/',
        { get: { method: 'JSONP' }
        });
});

