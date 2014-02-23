angular.module("ChatApp").factory("Globals", [function() {
	var userName = "";
	var socket;
	
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
		}
	};
}]);