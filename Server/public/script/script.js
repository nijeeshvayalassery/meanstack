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
		alert(JSON.stringify($scope.FormVal))
		webservice.postForm(JSON.stringify($scope.FormVal)).then(function(data){
			alert('OK')
			alert(JSON.stringify(data))
		},function(data){
			alert('error')
			alert(JSON.stringify(data))
		})
	}
})
App.factory('webservice', ['$http','$q', function($http,$q){
	return {
		enduri:'api/user',
		postForm:function(data){
			alert(this.enduri)
			var deff=$q.defer()
			$http.post("api/user",data).then(function(response){
				deff.resolve(response)
			}).then(function(err){
				deff.reject(err)
			})
			return deff.promise
		}
	};
}])