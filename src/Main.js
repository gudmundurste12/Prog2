//Set up the module with dependencies
angular.module("ChatApp", ['ngRoute']);

angular.module("ChatApp").controller("MainCtrl", ["$scope", function($scope){
	var userName = prompt("Please select a user name");
	while(false) //Replace with some condition
	{
		userName = prompt("That user name is already taken\nPlease select a different user name");
	}
	$scope.userName = userName;
}]);

angular.module("ChatApp").config(function($routeProvider){
	
});