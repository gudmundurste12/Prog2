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
					setTimeout(function(){
							$scope.errorMessage = "";
					}, 5000);
				}
				else
				{
					Globals.setUserName($scope.userName);
					$location.path("/Home/Lobby");
				}
			}
			else{
				//The user name is taken or something else is wrong
				if($scope.userName === ""){
					$scope.errorMessage = "Please select a user name";
				}
				else{
					$scope.errorMessage = "That user name is already taken!";
				}
				$(".alert").show();
				setTimeout(function(){
						$(".alert").hide();
				}, 5000);
			}
			$scope.$apply();
		});
	};
	
	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.connect();
		}
	};
	$(".alert").hide();
}]);

