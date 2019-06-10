
/// <reference path="angular.js" />
/// <reference path="angular-route.js" />
var myApp = angular.module("myModule", ["ngRoute"])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.caseInsensitiveMatch = true;

        $routeProvider.when("/home", { templateUrl: "../Templates/home.html", controller: "homeController" })
            .when("/courses", { templateUrl: "../Templates/courses.html", controller: "coursesController" })
            .when("/students", { templateUrl: "../Templates/students.html", controller: "studentsController as studentsCtrl" ,
            resolve: {
                studentslist: function ($http) {
                    return $http.get("https://my-json-server.typicode.com/mrmak666/myJsApp/employees/")
                            .then(function (response) {
                                return response.data;
                            })
                }} 
        })
            .when("/students/:id", { templateUrl: "../Templates/studentDetails.html", controller: "studentDetailsController", controllerAs: "studentDetailsCtrl"}) // we can use controller as syntax
            .otherwise({ redirectTo: "/home" })
        $locationProvider.html5Mode(true);
    })
    .controller("homeController", function ($scope) {

        $scope.message = "Home Page";
    })
    .controller("coursesController", function ($scope) {
        $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server", "AngularJS", "JavaScript"];
    })
    .controller("studentsController", function (studentslist, $route,$scope,$rootScope, $log  ) {
        
        // confirm leave page:
        $scope.$on("$routeChangeStart", function (event, next, current) {
            if (!confirm("Are you sure you want to navigate away from this page to " + next.$$route.originalPath)) {
                event.preventDefault();
            }
        });
        // or using location change where next and current will have the full URL info:
        // $scope.$on("$locationChangeStart", function (event, next, current) {
        //     if (!confirm("Are you sure you want to navigate away from this page to " + next)) {
        //         event.preventDefault();
        //     }
        // });
        // --------------------------------------------
        $rootScope.$on("$locationChangeStart", function () {
            $log.debug("$locationChangeStart fired");
        });
    
        $rootScope.$on("$routeChangeStart", function () {
            $log.debug("$routeChangeStart fired");
        });
    
        $rootScope.$on("$locationChangeSuccess", function () {
            $log.debug("$locationChangeSuccess fired");
        });
    
        $rootScope.$on("$routeChangeSuccess", function () {
            $log.debug("$routeChangeSuccess fired");
        });

        // to reload list , it will refresh the controller only
        var vm = this;
        vm.reloadData = function () { $route.reload(); }
        //-------------------------------------------------------------------------------
        vm.students = studentslist;     


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
