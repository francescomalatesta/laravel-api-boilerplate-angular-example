var bookWishlistAppServices = angular.module('bookWishlistAppServices', [
	'LocalStorageModule',
	'restangular'
]);

bookWishlistAppServices.factory('userService', ['$http', 'localStorageService', function($http, localStorageService) {

	function checkIfLoggedIn() {

		if(localStorageService.get('token'))
			return true;
		else
			return false;

	}

	function signup(name, email, password, onSuccess, onError) {

		$http.post('/api/auth/signup', 
		{
			name: name,
			email: email,
			password: password
		}).
		then(function(response) {

			localStorageService.set('token', response.data.token);
			onSuccess(response);

		}, function(response) {

			onError(response);

		});

	}

	function login(email, password, onSuccess, onError){

		$http.post('/api/auth/login', 
		{
			email: email,
			password: password
		}).
		then(function(response) {

			localStorageService.set('token', response.data.token);
			onSuccess(response);

		}, function(response) {

			onError(response);

		});

	}

	function logout(){

		localStorageService.remove('token');

	}

	function getCurrentToken(){
		return localStorageService.get('token');
	}

	return {
		checkIfLoggedIn: checkIfLoggedIn,
		signup: signup,
		login: login,
		logout: logout,
		getCurrentToken: getCurrentToken
	}

}]);

bookWishlistAppServices.factory('bookService', ['Restangular', 'userService', function(Restangular, userService) {

	function getAll(onSuccess, onError){
		Restangular.all('api/books').getList().then(function(response){

			onSuccess(response);
		
		}, function(){

			onError(response);

		});
	}

	function getById(bookId, onSuccess, onError){

		Restangular.one('api/books', bookId).get().then(function(response){

			onSuccess(response);

		}, function(response){

			onError(response);

		});

	}

	function create(data, onSuccess, onError){

		Restangular.all('api/books').post(data).then(function(response){

			onSuccess(response);
		
		}, function(response){
			
			onError(response);
		
		});

	}

	function update(bookId, data, onSuccess, onError){

		Restangular.one("api/books").customPUT(data, bookId).then(function(response) {
				
				onSuccess(response);

			}, function(response){
				
				onError(response);
			
			}
		);

	}

	function remove(bookId, onSuccess, onError){
		Restangular.one('api/books/', bookId).remove().then(function(){

			onSuccess();

		}, function(response){

			onError(response);

		});
	}

	Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		remove: remove
	}

}]);