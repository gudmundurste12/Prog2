angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals){
	$scope.chatRooms = [];
	$scope.messageList = [];
	$scope.userList = [];
	$scope.roomName = $routeParams.roomName;
	$scope.userName = Globals.getUserName();
	var socket = Globals.getSocket();
	
	//Asks the server for a list of chatrooms
	function getChatRooms(){
		//The server will emit the roomlist event as a response
		socket.emit("rooms");
		
	}
	
	//The server is sending the chatrooms
	socket.on("roomlist", function(rooms){
		$scope.chatRooms = rooms;
		console.log($scope.chatRooms);
		
		$scope.$apply();
	});
	
	$scope.createNewChatRoom = function(){
		//TODO: Implement
		console.log("Create a new chatroom");
	};
	
	//Request to join a chatroom
	//TODO: Handle the events
	function joinRoom(){
		//As a response, the server will emit the following events:
		//updateusers, servermessage, updatechat, updatetopic(not required to handle)
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