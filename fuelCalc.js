var app = angular.module("fuelCalc", ['ngRoute']); 

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'modepages/simplemode.html',
      controller: 'simpleModeController'
    })
    .when('/simple', {
      templateUrl: 'modepages/simplemode.html',
      controller: 'simpleModeController'
    })
    .when('/standard', {
      templateUrl: 'modepages/standardmode.html',
      controller: 'standardModeController'
    })
    .when('/advanced', {
      templateUrl: 'modepages/advancedmode.html',
      controller: 'advancedModeController'
    })
});
