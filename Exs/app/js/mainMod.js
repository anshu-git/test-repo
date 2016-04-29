//MainMod.js

//Define Angular module
//means mainMod module depends on []list of modules.
angular.module('mainMod',['ngMessages','ui-notification','philServices'])
//---Controllers
.controller('productsCtrl',function($scope,productJSON,$rootScope){//args are ctrl name and its definition.
	$scope.Title = "Top Products";                 //any data in $scope becomes visible
	$scope.Products = JSON.parse(productJSON);// to implicit view logic.
	//Event Handler for select Button
	$scope.onSelect= function(product){
		$rootScope.Product=product;//Making Product available in rootScope
	};
})
.controller('tabsCtrl',function(){
	//initial tab
	this.tab = 1;
	//set Tab
	this.setTab= function(tabIdx){
		this.tab=tabIdx;
	};
	//get Tab
	this.isTab= function(tabIdx){
		return(this.tab===tabIdx);
	};
})
.controller('reviewsCtrl',['$scope','$rootScope',function(scope,rootScope,Notification){//Insted of [] we can use function($scope,$rootScope)
	scope.Review={};
	//Event Handler for submission
	scope.save= function(){
		if(angular.isDefined(scope.Review.Rating) && angular.isDefined(rootScope.Product)){
			rootScope.Product.Reviews.push(scope.Review);
			scope.Review={};	
			Notification.success({message :"Review saved!!",  title : "status..."});
		}
	};
	
}]);