angular.module("ChatApp").controller("HomeCtrl", 
	["$scope", "$location", "Globals", "$routeParams", function($scope, $location, Globals, $routeParams){
	//$scope.chatRooms = [];
	// Dummy chatrooms
	$scope.chatRooms = [{
		topic: "WAT"
	}, {
		topic: "Here be chatrooms"
	}, {
		topic: "Who's your daddy and what does he do?"
	}];
	
	
	
	$scope.messageList = [];
	$scope.userList = [];
	$scope.roomName = $routeParams.roomName;
	$scope.chatRoomName = "";
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
		console.log("Creating a new chatroom: " + $scope.chatRoomName);
		$scope.joinRoom(undefined);
	};
	
	//Request to join a chatroom
	//TODO: Handle the events
	$scope.joinRoom = function(id){
		console.log("Kominn i joinRoom");
		console.log(id);
		//As a response, the server will emit the following events:
		//updateusers, servermessage, updatechat, updatetopic(not required to handle)
		socket.emit("joinroom", {room: undefined}, function(success, reason){
			if(success === true){
				if(id === undefined){
					Globals.setNumberOfRooms(Globals.getNumberOfRooms() + 1);
					id = Globals.getNumberOfRooms();
					console.log(id);
				}
				
				alert("Success");
				$location.path("Home/" + id);
				$scope.$apply();
			}
			else{
				alert("Failure");
			}
		});
	};
	
	//Sends information about the users in the chatroom
	socket.on("updateusers", function(room, users){
		//TODO: Implement
		
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
	socket.on("updatechat", function(roomName, messageHistory){
		//TODO: Implement
		
	});
}]);