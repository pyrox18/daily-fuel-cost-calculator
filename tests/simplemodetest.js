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

  describe('$scope.fuelCost', function() {
    it('should return the correct fuel cost after commission', function() {
      scope.fuelPrice = 1.80;
      scope.fuelCommision = 0.1114;
      scope.$digest();
      expect(scope.fuelCost).toEqual(1.6886);
    });
  });

  describe('$scope.fuelReceivingCost', function() {
    it('should return approx. total fuel cost', function() {
      scope.fuelCost = 1.6886;
      scope.fuelReceivingAmount = 10920;
      scope.$digest();
      expect(scope.fuelReceivingCost).toBeCloseTo(18439.51, 2);
    });
  });

  describe('$scope.isThereEnoughMoney function', function() {
    beforeEach(function() {
      scope.bankBalance = 100000;
    });

    it('should return neutral message when there are no deliveries', function() {
      scope.fuelReceivingCost = 0;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("default");
    });

    it('should return good message when balance > cost', function() {
      scope.fuelReceivingCost = 50000;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("safe");
    });

    it('should return bad message when balance < cost', function() {
      scope.fuelReceivingCost = 200000;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("unsafe");
    });
  });

  describe('Full functionality', function() {
    beforeEach(function() {
      scope.bankBalance = 100000;
      scope.fuelPrice = 1.80;
      scope.fuelCommission = 0.1114;
    });

    it('should return good message', function() {
      scope.fuelReceivingAmount = 10920;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("safe");
    });

    it('should return bad message', function() {
      scope.fuelReceivingAmount = 109200;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("unsafe");
    });
  });

});
