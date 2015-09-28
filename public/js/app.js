var bookWishlistApp = angular.module('bookWishlistApp', [
  'ngRoute',
  'bookWishlistAppControllers'
]);

bookWishlistApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('bookWishlistApp')
    .setStorageType('localStorage');
});

bookWishlistApp.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.
	when('/login', {
	    templateUrl: 'partials/login.html',
	    controller: 'LoginController'
	}).
	when('/signup', {
	    templateUrl: 'partials/signup.html',
	    controller: 'SignupController'
	}).
	when('/', {
	    templateUrl: 'partials/index.html',
	    controller: 'MainController'
	}).
	otherwise({
	    redirectTo: '/'
	});

}]);