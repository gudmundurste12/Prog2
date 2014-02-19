angular.module("ChatApp").controller("HomeCtrl", ["$scope", function($scope){
	var userName = prompt("Please select a user name");
	while(false) //Replace with some condition
	{
		userName = prompt("That user name is already taken\nPlease select a different user name");
	}
	$scope.userName = userName;
}]);