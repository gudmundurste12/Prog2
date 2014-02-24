angular.module("ChatApp").factory("Globals", [function() {
	var userName = "";
	var socket;
	var numberOfRooms = 0;
	var currentRoom;
	
	return {
		setUserName: function(u) {
			userName = u;
		},
		getUserName: function() {
			return userName;
		},
		
		getSocket: function() {
			if(socket === undefined) {
				socket = io.connect("http://localhost:8080");
			}
			return socket;
		},
		
		getNumberOfRooms: function(){
			return numberOfRooms;
		},
		
		setNumberOfRooms: function(a){
			numberOfRooms = a;
		},
		
		getCurrentRoom: function(){
			return currentRoom;
		},
		
		setCurrentRoom: function(a){
			currentRoom = a;
		}
	};
}]);