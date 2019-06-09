
/// <reference path="angular.js" />
/// <reference path="angular-route.js" />
var myApp = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/home", { templateUrl: "Templates/home.html", controller: "homeController" })
            .when("/courses", { templateUrl: "Templates/courses.html", controller: "coursesController" })
            .when("/students", { templateUrl: "Templates/students.html", controller: "studentsController" })
            .otherwise({redirectTo : "./home"})            
    })
    .controller("homeController", function ($scope) {
        
        $scope.message = "Home Page";
    })
    .controller("coursesController", function ($scope) {
        $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server", "AngularJS", "JavaScript"];
    })
     .controller("studentsController", function ($scope, $http) {
         $http.get("https://my-json-server.typicode.com/mrmak666/test/employees")
                                .then(function (response) {
                                    $scope.students = response.data;
                                })                                
     });
