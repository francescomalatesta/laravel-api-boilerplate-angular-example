var bookWishlistAppControllers = angular.module('bookWishlistAppControllers', [
	'bookWishlistAppServices'
]);

bookWishlistAppControllers.controller('LoginController', ['$scope', '$location', 'userService', function ($scope, $location, userService) {

	$scope.login = function() {
		userService.login(
			$scope.email, $scope.password,
			function(response){
				$location.path('/');
			},
			function(response){
				alert('Something went wrong with the login process. Try again later!');
			}
		);
	}

	$scope.email = '';
	$scope.password = '';

	if(userService.checkIfLoggedIn())
		$location.path('/');

}]);

bookWishlistAppControllers.controller('SignupController', ['$scope', '$location', 'userService', function ($scope, $location, userService) {

	$scope.signup = function() {
		userService.signup(
			$scope.name, $scope.email, $scope.password,
			function(response){
				alert('Great! You are now signed in! Welcome, ' + $scope.name + '!');
				$location.path('/');
			},
			function(response){
				alert('Something went wrong with the signup process. Try again later.');
			}
		);
	}

	$scope.name = '';
	$scope.email = '';
	$scope.password = '';

	if(userService.checkIfLoggedIn())
		$location.path('/');

}]);

bookWishlistAppControllers.controller('MainController', ['$scope', '$location', 'userService', 'bookService', function ($scope, $location, userService, bookService) {

	$scope.logout = function(){
		userService.logout();
		$location.path('/login');
	}

	$scope.create = function(){

		bookService.create({
			title: $scope.currentBookTitle,
			author_name: $scope.currentBookAuthorName,
			pages_count: $scope.currentBookPagesCount
		}, function(){

			$('#addBookModal').modal('toggle');
			$scope.currentBookReset();
			$scope.refresh();

		}, function(){

			alert('Some errors occurred while communicating with the service. Try again later.');

		});

	}

	$scope.refresh = function(){

		bookService.getAll(function(response){
			
			$scope.books = response;
		
		}, function(){
			
			alert('Some errors occurred while communicating with the service. Try again later.');
		
		});

	}

	$scope.load = function(bookId){

		bookService.getById(bookId, function(response){

			$scope.currentBookId = response.book.id;
			$scope.currentBookTitle = response.book.title;
			$scope.currentBookAuthorName = response.book.author_name;
			$scope.currentBookPagesCount = response.book.pages_count;

			$('#updateBookModal').modal('toggle');

		}, function(){

			alert('Some errors occurred while communicating with the service. Try again later.');

		});

	}

	$scope.update = function(){

		bookService.update(
			$scope.currentBookId, 
			{
				title: $scope.currentBookTitle,
				author_name: $scope.currentBookAuthorName,
				pages_count: $scope.currentBookPagesCount
			}, 
			function(response){

				$('#updateBookModal').modal('toggle');
				$scope.currentBookReset();
				$scope.refresh();

			}, function(response){
				alert('Some errors occurred while communicating with the service. Try again later.');
			}
		);

	}

	$scope.remove = function(bookId){

		if(confirm('Are you sure to remove this book from your wishlist?')){
			bookService.remove(bookId, function(){

				alert('Book removed successfully.');

			}, function(){

				alert('Some errors occurred while communicating with the service. Try again later.');

			});
		}

	}

	$scope.currentBookReset = function(){
		$scope.currentBookTitle = '';
		$scope.currentBookAuthorName = '';
		$scope.currentBookPagesCount = '';
		$scope.currentBookId = '';
	}

	if(!userService.checkIfLoggedIn())
		$location.path('/login');

	$scope.books = [];

	$scope.currentBookReset();
	$scope.refresh();

}]);