angular.module("ChatApp").factory("Globals", [function(){
	var userName = "";
	var socket;
	
	return {
		setUserName: function(u){
			userName = u;
		},
		setSocket: function(s){
			socket = s;
		},
		
		getUserName: function(){
			return userName;
		},
		getSocket: function(){
			return socket;
		}
	};
}]);