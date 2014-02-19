angular.module("ChatApp").controller("HomeCtrl", ["$scope", "$location", function($scope, $location){
	var socket = io.connect('http://localhost:8080');
	$scope.userName = "";
	$scope.errorMessage;
	
	$scope.connect = function() {
		socket.emit("adduser", $scope.userName, function(available){
			if(available){
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
				}
				else
				{
					//The user name is not taken
					console.log("available");
					$scope.errorMessage = "";
					//TODO: Add the user
				}
			}
			else{
				//The user name is taken or something else is wrong
				console.log("not available");
				console.log($scope.userName);
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
				}
				else{
					$scope.errorMessage = "That user name is already taken";
				}
			}
		});
	};
	
	
	
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