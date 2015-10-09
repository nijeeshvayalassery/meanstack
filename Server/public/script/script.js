var App=angular.module('UserRegApp', ['ngRoute','directives','factories'])
App.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/addUser', {
		templateUrl:'Templates/AddUser.html',
		controller:'AddUserCtrl'
	}).when('/login',{
		templateUrl:'Templates/Login.html',
		controller:'LoginCtrl'
	}).when('/home',{
		templateUrl:'Templates/userhome.html',
		controller:'HomeCtrl'
	}).otherwise({
		templateUrl:'Templates/NotFound.html',
		controller:'AddUserCtrl'
	})
}])
App.controller('AddUserCtrl',function($scope,webservice){
	Logging_Succ=false
	$scope.userFields=[
	{
		name:'firstname',
		label:'First Name',
		type:'text',
		required:true
	},
	{
		name:'lastname',
		label:'Last Name',
		type:'text',
		required:false
	},
	{
		name:'email',
		label:'Email Id',
		type:'email',
		required:false 
	},
	{
		name:'mobile',
		label:'Mobile',
		type:'text',
		required:false
	}
	]
	$scope.FormVal={}
	$scope.postForm=function(){
		webservice.postForm(JSON.stringify($scope.FormVal),'api/user').then(function(data){
			$scope.Logging_Succ=true;
		},function(data){
			alert(JSON.stringify(data))
		})
	}
})
App.controller('LoginCtrl',function($scope,webservice,userfactory){
	$scope.user={}
	$scope.doLogin=function(){
		webservice.postForm(JSON.stringify($scope.user),'api/login').then(function(data){
			if(data.data.success){
				//alert(JSON.stringify(data.data.user))
				userfactory.setuser(data.data.user)
				$scope.LogFailed=false;
			}else{
				$scope.LogFailed=true;
				//alert('invalid login')
			}
		},function(err){
			alert(JSON.stringify(data))
		})
	}
})
App.controller('HomeCtrl',function($scope,userfactory){
	alert(JSON.stringify(userfactory.getcurrentuser()))
	$scope.user=userfactory.getcurrentuser();
})
