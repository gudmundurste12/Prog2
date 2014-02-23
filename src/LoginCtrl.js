app.controller("LoginCtrl", 
	["$scope", "$location", "Globals", function($scope, $location, Globals){
	console.log(Globals);
	$scope.userName = Globals.getUserName();
	$scope.errorMessage = "";
	
	//Connects the user to the app
	$scope.connect = function() {
		socket.emit("adduser", $scope.userName, function(available){
			if(available){
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name:";
				}
				else
				{
					//The user name is not taken
					console.log("Name available");
					$scope.errorMessage = "";
					
					//TODO: Add the user and other setup before leaving
					Globals.setUserName($scope.userName);
					$location.path("/Home");
					
				}
			}
			else{
				//The user name is taken or something else is wrong
				console.log("Username taken error");
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
				}
				else{
					$scope.errorMessage = "That user name is already taken!";
				}
			}
			$scope.$apply();
		});
	};
}]);