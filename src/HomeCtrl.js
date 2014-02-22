angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$routeParams", "$location", function($scope, $location){
	$scope.chatRooms=[];
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