'use strict';
 
angular.module('Book')
 
.controller('BookController',function ($scope, BookService) {
    $scope.searchTerm = "";
    $scope.books = [];
    $scope.totalItems = 0;
    $scope.currentPage =0,
    $scope.itemsPerPage = 3;
    $scope.favorites = JSON.parse(window.localStorage.getItem('favorites')) ||[];

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };    

    $scope.doSearch = function () {
        getResultsPage(0);
    }
    $scope.pageChanged = function() {
        getResultsPage($scope.currentPage);
      };

  function getResultsPage(pageNumber) {
        BookService.get({ q: $scope.searchTerm, startIndex:pageNumber*$scope.itemsPerPage , maxResults:$scope.itemsPerPage }, function (response) {
            $scope.bookResults = response.items;
               $scope.orderProp = 'volumeInfo.title';
               $scope.totalItems =response.totalItems;
        });
    }
    $scope.deleteFavorite=function(id){
        
        const index = $scope.favorites.indexOf(id);
        if (index > -1) { 
            $scope.favorites.splice(index, 1); 
            updateFavoriteStorage();
            }
    }

    $scope.addFavorite =function(id){
        $scope.favorites.push(id); 
        updateFavoriteStorage(); 
    }

    $scope.isFavorite = function(id){
        const index= $scope.favorites.indexOf(id);
        if(index>-1)
         return true;
    };

    function updateFavoriteStorage(){
        window.localStorage.setItem('favorites',JSON.stringify($scope.favorites));
    }
});