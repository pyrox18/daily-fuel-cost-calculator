describe('simpleModeController', function() {
  beforeEach(module('fuelCalc'));

  var simpleModeController, scope, http;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    http = $httpBackend;
    simpleModeController = $controller('simpleModeController', {
      $scope: scope
    });
    http.expectGET("data/fuelPriceData.js").respond({hello: "world"});
    scope.$digest();
  }));

  it('should return true or something', function() {
    scope.fuelCommision = 0.1114;
    scope.$digest();
    expect(scope.fuelCost).toEqual(1.6886);
  });

});
