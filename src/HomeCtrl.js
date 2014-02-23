angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals){
	$scope.chatRooms = [];
	$scope.userName = Globals.getUserName();
	var socket = Globals.getSocket();
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