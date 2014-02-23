angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals){
	$scope.chatRooms = [];
	$scope.userName = Globals.getUserName();
	$scope.errorMessage = "";
	var socket = Globals.getSocket();
	
	
	
	joinRoom();
	
	
	
	socket.on("roomlist", function(rooms){
		$scope.chatRooms = rooms;
		console.log($scope.chatRooms);
		
		$scope.$apply();
	});
	
	function getChatRooms(){
		socket.emit("rooms");
	}
	
	//TODO: Redirect to chatroom
	function joinRoom(){
		socket.emit("joinroom", {room: undefined}, function(success, reason){
			if(success === true){
				alert("Success");
			}
			else{
				alert("Failure");
			}
			
			getChatRooms();
		});
	}
	
	
}]);