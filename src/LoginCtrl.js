angular.module("ChatApp").controller("LoginCtrl", ["$scope", "$location", function($scope, $location){
	
	$scope.userName = "";
	$scope.errorMessage = "Error message";
	
	//Connects the user to the app
	$scope.connect = function() {
		socket.emit("adduser", $scope.userName, function(available){
			if(available){
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name:";
					$scope.$apply();
				}
				else
				{
					//The user name is not taken
					console.log("Name available");
					$scope.errorMessage = "";
					
					//TODO: Add the user and other setup before leaving
					$location.path("/Home");
					$scope.$apply();
					
					
				}
			}
			else{
				//The user name is taken or something else is wrong
				console.log("Username taken error");
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
					$scope.$apply();
				}
				else{
					$scope.errorMessage = "That user name is already taken!";
					$scope.$apply();
				}
			}
		});
	};
}]);