angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals, $routeParams){
		
	$scope.chatRooms = [];
	$scope.messageList = [];
	$scope.userList = [];
	$scope.chatRoomName = "";
	$scope.userName = Globals.getUserName();
	$scope.theMessage = "";
	$scope.currentRoom = $routeParams.roomName;
	var socket = Globals.getSocket();
	
	getChatRooms();
	
	
	//Asks the server for a list of chatrooms
	function getChatRooms(){
		//The server will emit the roomlist event as a response
		socket.emit("rooms");
		
	}
	
	//The server is sending the chatrooms
	socket.on("roomlist", function(rooms){
		$scope.chatRooms = rooms;
		delete rooms.lobby;
		$scope.$apply();
	});
	
	$scope.createNewChatRoom = function(){
		//TODO: Implement
		console.log("Creating a new chatroom: " + $scope.chatRoomName);
		Globals.setNumberOfRooms(Globals.getNumberOfRooms() + 1);
		$scope.joinRoom(Globals.getNumberOfRooms() - 1);
	};
	
	//Request to join a chatroom
	$scope.joinRoom = function(id){
		//As a response, the server will emit the following events:
		//updateusers, servermessage, updatechat, updatetopic(not required to handle)
		socket.emit("joinroom", {room: id}, function(success, reason){
			if(success === true){
				$scope.currentRoom = id;
				
				$location.path("Home/" + id);
				$scope.$apply();
			}
			else{
				alert("Failure");
			}
		});
	};
	
	$scope.leaveRoom = function(){
		socket.emit("partroom", $scope.currentRoom);
		$location.path("Home/Lobby");
		$scope.currentRoom = "Lobby";
		$scope.$apply();
	};
	
	//Sends information about the users in the chatroom
	socket.on("updateusers", function(room, users, ops){
		console.log("updateusers");
		if($scope.currentRoom == room){
			$scope.userList = users;
		}
		$scope.$apply();
	});
	
	//Informs about the newly added or removed user
	socket.on("servermessage", function(message, room, userName){
		//TODO: Implement
		if(message === "join"){
			
		}
		else{
			
		}
		
	});
	
	//Only used if a new room is being created
	socket.on("updatechat", function(roomNumber, messageHistory){
		console.log("updatechat");
		if($scope.currentRoom == roomNumber){
			$scope.messageList = messageHistory;
		}
		$scope.$apply();
	});
	
	
	$scope.sendMessage = function(){
		console.log("currentRoom: " + $scope.currentRoom);
		console.log("message: " + $scope.theMessage);
		socket.emit("sendmsg", {roomName: $scope.currentRoom, msg: $scope.theMessage});
		$scope.theMessage = "";
		$scope.$apply();
	};
	
	
	
	
}]);