angular.module('spaMod',['ngRoute'])

.controller('booksCtrl',['$scope','dataService',function(scope,service){ 
	scope.Books=service.Books;
	scope.search=function(){
		alert("looking for  : "+ scope.query);
			service.getBooks(scope.query)
			.success(function(result){
				scope.Books=result.Books;
				service.Books=result.Books;
			})
			.error(function(err){
				alert('search failed: ' + err.statusText);
			});
			service.getDetails()
			.sucsess()
	};
}])	
.controller('detailsCtrl',['$scope',function(scope){ }])	



//...........Factory
.factory('dataFactory',['$http',function($http){
	var url = 'http://it-ebooks-api.info/v1/search/';

	var fo={
		Books: null
	};
	fo.getBooks = function(query){
		return $http.get(url + query);
	};
	return fo;
}])



//...................SERVICE
.service('dataService',['$http','$q',function($http,$q){
	var url = 'http://it-ebooks-api.info/v1/search/';
	var durl='http://it-ebooks-api.info/v1/book/'
	this.Books=null;
	this.getBooks = function(query){
		return $http.get(url + query);
	};
	this.getDetails= function(id){
		var defer= $q.defer();
		$http.get(durl+ id)
		.success(function(result){
			defer.notify("....response received")
			defer.resolve(result);
		})
		.error(function(err){
			defer.notify()
			defer.reject(err.statusText);
		});
		return defer.promise;
	}
}])


//.............Configuration
.config(['$routeProvider',function(routeProvider){
	//configure valid URLs
	routeProvider
		.when('/',{templateUrl: 'app/templates/home.html'})
		.when('/books',{templateUrl: 'app/templates/books.html', controller : 'booksCtrl'})
		.when('/book/:id',{templateUrl: 'app/templates/book-details.html', controller : 'detailsCtrl'})
		.otherwise({redirectTo: '/'});
}]);