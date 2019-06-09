
/// <reference path="angular.js" />
/// <reference path="angular-route.js" />
var myApp = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.caseInsensitiveMatch = true;

        $routeProvider.when("/home", { templateUrl: "../Templates/home.html", controller: "homeController" })
            .when("/courses", { templateUrl: "../Templates/courses.html", controller: "coursesController" })
            .when("/students", { templateUrl: "../Templates/students.html", controller: "studentsController as studentsCtrl" })
            .when("/students/:id", { templateUrl: "../Templates/studentDetails.html", controller: "studentDetailsController as studentDetailsCtrl" }) // we can use controller as syntax
            .otherwise({ redirectTo: "/home" })
        $locationProvider.html5Mode(true);
    })
    .controller("homeController", function ($scope) {

        $scope.message = "Home Page";
    })
    .controller("coursesController", function ($scope) {
        $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server", "AngularJS", "JavaScript"];
    })
    .controller("studentsController", function ($http, $route) {
        
        // to reload list when click on the students link, it will refresh the controller only
        var vm = this;
        vm.reloadData = function () { $route.reload(); }
        //-------------------------------------------------------------------------------
        $http.get("https://my-json-server.typicode.com/mrmak666/myJsApp/employees")
            .then(function (response) {
                vm.students = response.data;
            })


    })
    .controller("studentDetailsController", function ($http, $routeParams, $log) {
        var vm = this;
        $http({
            url: "https://my-json-server.typicode.com/mrmak666/myJsApp/employees/",
            method: "get",
            params: { id: $routeParams.id }
        }).then(function (response, err) {
            if (err) throw err;
            $log.info(response.data[0]);
            vm.student = response.data[0];
        })
    });
