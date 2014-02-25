angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", 
	function($scope, $location, Globals, $routeParams){
		
	$scope.chatRooms = [];
	$scope.messageList = [];
	$scope.userList = [];
	$scope.chatRoomName = "";
	$scope.userName = Globals.getUserName();
	$scope.theMessage = "";
	$scope.errorMessage = "";
	$scope.privateMessages = [];
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
				alert("Joining room failed: " + reason);
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
		$scope.$apply();
		console.log("updateusers");
		if($scope.currentRoom == room){
			$scope.userList = users;
			console.log(users);
		}
		$scope.$apply();
	});
	
	//Informs about the newly added or removed user
	socket.on("servermessage", function(message, room, userName){
		//TODO: Implement
		$scope.$apply();
		console.log("ServerMessage");
		if(message === "join"){
			if($scope.currentRoom === room){
				$scope.userList[userName] = userName;
			}
		}
		else{
			
		}
		$scope.$apply();
	});
	
	//Only used if a new room is being created
	socket.on("updatechat", function(roomNumber, messageHistory){
		console.log("updatechat");
		$scope.$apply();
		if($scope.currentRoom == roomNumber){
			$scope.messageList = messageHistory;
		}
		$scope.$apply();
	});
	
	socket.on("recv_privatemsg", function(from, message){
		console.log("Private message from " + from + ": " + message);
		
		$scope.privateMessages.push({from: from, message: message});
		$scope.$apply();
	});
	
	socket.on("kicked", function(room, kicked, kickedBy){
		console.log(kicked + " kicked from " + room + " by " + kickedBy);
		console.log(Globals.getUserName());
		if(($scope.userName === kicked) && ($scope.currentRoom === room)){
			alert("You have been kicked from the room");
			$scope.leaveRoom();
		}
	});
	
	socket.on("banned", function(room, banned, bannedBy){
		console.log(banned + " banned from " + room + " by " + bannedBy);
		console.log(Globals.getUserName());
		if(($scope.userName === banned) && ($scope.currentRoom === room)){
			alert("You have been banned from the room");
			$scope.leaveRoom();
		}
	});
	
	
	$scope.sendMessage = function(){
		var mess = $scope.theMessage;
		var i = mess.indexOf(" ");
		
		if(mess[0] === "@"){
			//The user is sending a personal message
			console.log("Personal message");
			var recipient = mess.slice(1,i);
			var message = mess.slice(i + 1);
			console.log(recipient);
			console.log(message);
			
			socket.emit("privatemsg", {nick: recipient, message: message}, function(successful){
				if(successful){
					console.log("Message successfully sent");
				}
				else{
					console.log("Message not sent");
				}
			});
		}
		else if(mess[0] === "/"){
			//The user is entering a command
			console.log("Command");
			var command = mess.slice(1,i);
			var args = mess.slice(i + 1);
			console.log(command);
			console.log(args);
			//TODO: Send the kick or ban events and handling events from the server
			//if(args.length() > 0){
			if(command === "ban"){
				socket.emit("ban", {user: args, room: $scope.currentRoom}, function(successful){
					if(successful){
						console.log("User successfully banned");
					}
					else{
						console.log("Banning user failed");
						$scope.errorMessage = "You are not an op for this room!";
						$(".alert").show();
						$scope.$apply();
						setTimeout(function(){
							$(".alert").hide();
						}, 5000);
					}
				});
			}
			else if(command === "kick"){
				socket.emit("kick", {user: args, room: $scope.currentRoom}, function(successful){
					if(successful){
						console.log("User successfully kicked");
					}
					else{
						console.log("Kicking user failed");
						$scope.errorMessage = "You are not an op for this room!";
						$(".alert").show();
						$scope.$apply();
						setTimeout(function(){
							$(".alert").hide();
						}, 5000);
					}
				});
			}
		}
		else{
			socket.emit("sendmsg", {roomName: $scope.currentRoom, msg: $scope.theMessage});
		}
		$scope.theMessage = "x";
		$scope.$apply();
	};

	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
				// Now we are using the enter buttons for two functions on the same Controller!
			if ( $scope.currentRoom === undefined){
				// If we are in the lobby, use enter to join room.
				$scope.joinRoom();
			}else{
				// If we are in a room (not lobby), use enter to send message.
				$scope.sendMessage();
			}

		}
	};

	$(".alert").hide();

}]);