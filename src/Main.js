//Set up the module with dependencies
angular.module("ChatApp", ['ngRoute']);


angular.module("ChatApp").config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/", {
		templateUrl: "views/Login.html",
		controller: "LoginCtrl"
	});
}]);