'use strict';
 
angular.module('Book')
 
.factory('BookService', function ($resource) {
    console.log($resource);
    return $resource('https://www.googleapis.com/books/v1/volumes',
        { get: { method: 'JSONP' }
        });
});