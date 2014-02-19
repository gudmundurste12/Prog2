angular.module("ChatApp").controller("HomeCtrl", ["$scope", "$location", function($scope, $location){
	var socket = io.connect('http://localhost:8080');
	$scope.userName = "";
	$scope.connect = function() {
		socket.emit("adduser", $scope.userName, function(available){
			if(available){
				//The user name is not taken
				console.log("available");
				succeeded = true;
			}
			else{
				//The user name is taken
				console.log("not available");
				succeeded = false;
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