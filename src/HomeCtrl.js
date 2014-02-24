angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals, $routeParams){
	
	
	//Dummy chatrooms
	// $scope.chatRooms = [{
		// topic: "WAT"
	// }, {
		// topic: "Here be chatrooms"
	// }, {
		// topic: "Who's your daddy and what does he do?"
	// }];
	
	
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
				//if(id === undefined){
				//	Globals.setNumberOfRooms(Globals.getNumberOfRooms() + 1);
				//	id = Globals.getNumberOfRooms();
				//}
				$scope.currentRoom = id;
				//alert("Success");
				
				$location.path("Home/" + id);
				$scope.$apply();
			}
			else{
				alert("Failure");
			}
		});
	};
	
	//Sends information about the users in the chatroom
	socket.on("updateusers", function(room, users, ops){
		if($scope.currentRoom == room){
			$scope.userList = users;
		}
		console.log("updateusers");
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