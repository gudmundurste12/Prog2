angular.module("ChatApp").controller("HomeCtrl", ["$scope", function($scope){
	var userName = prompt("Please select a user name");
	
	while((userName == null) || false) //Replace false with some condition, check if the userName exists
	{
		if(userName == null)
		{
			userName = prompt("You must select a user name");
		}
		else
		{
			userName = prompt("That user name is already taken\nPlease select a different user name");
		}
	}
	$scope.userName = userName;
	
	$scope.getChatRooms = function($scope){
		return [{
			"ID": 1,
			"Name": "Name1"
		}, {
			"ID": 2,
			"Name": "Awesome chat room"
		}, {
			"ID": 3,
			"Name": "Just another chat room"
		}];
	}
}]);