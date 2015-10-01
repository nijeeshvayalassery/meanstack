var App=angular.module('UserRegApp', ['ngRoute'])
App.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/addUser', {
		templateUrl:'Templates/AddUser.html',
		controller:'AddUserCtrl'
	}).otherwise({
		templateUrl:'Templates/NotFound.html',
		controller:'AddUserCtrl'
	})
}])
App.controller('AddUserCtrl',function($scope,webservice){
	$scope.userFields=[
	{
		name:'firstname',
		label:'First Name', 
	},
	{
		name:'lastname',
		label:'Last Name'
	},
	{
		name:'email',
		label:'Email Id' 
	},
	{
		name:'mobile',
		label:'Mobile'
	}
	]
	$scope.FormVal={}
	$scope.postForm=function(){
		webservice.postForm(JSON.stringify($scope.FormVal)).then(function(){
			alert('OK')
		})
	}
})
App.factory('webservice', ['$http','$q', function($http,$q){
	return {
		enduri:'http://localhost:8081/api/user',
		postForm:function(data){
			var deff=$q.defer()
			$http.post({
				url:'http://localhost:8081/api/user',
				data:data
			}).then(function(response){
				deff.resolve(response)
			}).then(function(err){
				deff.resolve(err)
			})
			return deff.promise
		}
	};
}])