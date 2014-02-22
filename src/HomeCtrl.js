app.controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals){
	console.log(Globals);
	$scope.chatRooms=[];
	$scope.userName = Globals.getUserName();
	getChatRooms();
	
	socket.on("roomlist", function(rooms){
		$scope.chatRooms = rooms;
		console.log($scope.chatRooms);
		
		$scope.$apply();
	});
	
	function getChatRooms(){
		socket.emit("rooms");
	}
	
	
	
	
}]);