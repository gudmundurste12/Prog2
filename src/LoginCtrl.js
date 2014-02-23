angular.module("ChatApp").controller("LoginCtrl", 
	["$scope", "$location", "Globals", function($scope, $location, Globals){
	$scope.userName = Globals.getUserName();
	$scope.errorMessage = "";
	var socket = Globals.getSocket();
	
	
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
					$scope.errorMessage = "";
					
					//TODO: Add the user and other setup before leaving
					Globals.setUserName($scope.userName);
					$location.path("/Home");
					$scope.$apply();
					
				}
			}
			else{
				//The user name is taken or something else is wrong
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