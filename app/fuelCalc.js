// AngularJS app initialisation and config for page routing

var app = angular.module("fuelCalc", ['ngRoute']); 

app.config(function($routeProvider) {
  $routeProvider
    // Default mode to load:
    .when('/', {
      templateUrl: 'modepages/standardmode.html',
      controller: 'standardModeController'
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
