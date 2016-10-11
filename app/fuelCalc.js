// AngularJS app initialisation, routing config and directives

angular.module("fuelCalc", ['ngRoute']);
var app = angular.module("fuelCalc");

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

// This directive still doesn't prevent 'e'/'+'/'-' as inputs
app.directive('floatsOnly', function() {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (inputValue) {
        if (inputValue == null) {
          // Change empty number fields to always have a 0
          inputValue = 0;
          modelCtrl.$setViewValue(0);
          modelCtrl.$render();
        }
        // Replace non-digit and non-decimal characters with ''
        var transformedInput = inputValue.toString().replace(/[^\d\.]/g, '');
        if (transformedInput != inputValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }
        // Remove leading 0 if input >= 1
        if (modelCtrl.$viewValue >= 1 && modelCtrl.$viewValue[0] == 0) {
          var newStr = modelCtrl.$viewValue.slice(1);
          modelCtrl.$setViewValue(newStr);
          modelCtrl.$render();
        }

        return transformedInput;
      });
    }
  };
});
