angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals){
	$scope.chatRooms = [];
	$scope.userName = Globals.getUserName();
	$scope.errorMessage = "";
	var socket = Globals.getSocket();
	
	//Asks the server for a list of chatrooms
	function getChatRooms(){
		socket.emit("rooms");
	}
	
	//The server is sending the chatrooms
	socket.on("roomlist", function(rooms){
		$scope.chatRooms = rooms;
		console.log($scope.chatRooms);
		
		$scope.$apply();
	});
	
	
	//Request to join a chatroom
	//TODO: Listen to the events emitted and handle them
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