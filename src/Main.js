//Set up the module with dependencies
var app = angular.module("ChatApp", ['ngRoute']);
var socket = io.connect('http://localhost:8080');

angular.module("ChatApp").config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/", {
		templateUrl: "views/Login.html",
		controller: "LoginCtrl"
	}).when("/Home", {
		templateUrl: "views/Home.html",
		controller: "HomeCtrl"
	}).otherwise({redirectTo: "/"});
}]);