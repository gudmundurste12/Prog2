//Set up the module with dependencies
angular.module("ChatApp", ['ngRoute']);

//Set up routing for the application
angular.module("ChatApp").config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/", {
		templateUrl: "views/Login.html",
		controller: "LoginCtrl"
	}).when("/Home/Lobby", {
		templateUrl: "views/Home.html",
		controller: "HomeCtrl"
	}).when("/Home/:roomName", {
		templateUrl: "views/ChatRoom.html",
		controller: "HomeCtrl"
	}).otherwise({redirectTo: "/"});
}]);