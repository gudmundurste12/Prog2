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
	//TODO: Handle the events
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
	
	//Sends information about the users in the chatroom
	socket.on("updateusers", function(room, users){
		//TODO: Implement
		
	});
	
	//Informs about the newly added or removed user
	socket.on("servermessage", function(message, room, userName){
		//TODO: Implement
		
	});
	
	//Only used if a new room is being created
	socket.on("updatechat", function(roomName, messageHistory){
		//TODO: Implement
		
	});
}]);