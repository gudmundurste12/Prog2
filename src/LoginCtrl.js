angular.module("ChatApp").controller("LoginCtrl", ["$scope", "$location", function($scope, $location){
	var socket = io.connect('http://localhost:8080');
	$scope.userName = "";
	$scope.errorMessage;
	
	$scope.connect = function() {
		socket.emit("adduser", $scope.userName, function(available){
			if(available){
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
					$scope.$apply();
				}
				else
				{
					//The user name is not taken
					console.log("Name available");
					$scope.errorMessage = "";
					
					$location.path("/Home");
					$scope.$apply();
					
					//TODO: Add the user
				}
			}
			else{
				//The user name is taken or something else is wrong
				console.log("Some error");
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
					$scope.$apply();
				}
				else{
					$scope.errorMessage = "That user name is already taken";
					$scope.$apply();
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