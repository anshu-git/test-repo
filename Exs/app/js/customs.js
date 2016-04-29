//customs.js

angular.module('philServices',[])


//<div my-list id="l1" data-field="name" dataSrc></div>
.directive('myList',[function(){
	return function(scope, elem,attrib){
		attrib.id="l1";//l1
		attrib.data-field="Name";
		var srcField=attrib.dataSrc//="Products"
		var data=scope[srcField]//get srcfield from the scope

		scope.within$watch(srcField,function(newV,oldV){
			
		})
		generateUL(scope, elem,attrib);
	};
	function generateUL(scope, elem,attrs){
		var srcField=attrs.dataSrc//="Products"
		var data=scope[srcField]//get srcfield from the scope
		if(angular.isDefined(data) && angular.isArray(data)){
			var ul =angular.element('<ul>');//create ul
			ul.addClass('list-group');
			angular.forEach(data, function(item){
				val li=angular.element('<li>');
				li.addClass('list-group-item');
				li.text(item[field]);
				ul.append(li);
			});
			ele.append(ul);
		}
	}
})]


.filter('filashDays',['$filter',function($filter){
	return function(days, args){//link-function
		var output='';
		if(days<2)
			output="Grab it fast";
		else if (days<5) 
			output="Pick it within "+days +"days";

		else if(days< args.days)
			output=args.days;
		else
			output="Availabe only for next "+ days + "days";
		return(output);
	}
}])