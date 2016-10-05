describe('advancedModeController', function() {
  beforeEach(module('fuelCalc'));

  var advancedModeController, scope, http;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    http = $httpBackend;
    advancedModeController = $controller('advancedModeController', {
      $scope: scope
    });
    http.expectGET("data/fuelPriceData.js").respond({hello: "world"});
    scope.$digest();
  }));

  describe('$scope.fuelTypeData (testing 1 fuel type only)', function() {
    beforeEach(function () {
      scope.fuelTypeData[0].price = 1.80;
      scope.fuelTypeData[0].commission = 0.1114;
      scope.$digest();
    });

/*
    it('should return cost per litre = 1.6886', function() {
      scope.$digest();
      expect(scope.fuelTypeData[0].cost).toEqual(1.6886);
    });

    it('should return cost ~= 18439.51 given amount = 10920', function() {
      scope.fuelDays[0][0].amount = 10920;
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(18439.51, 2);
    });

    it('should return cost ~= 18439.51 after adding a day', function() {
      scope.fuelDays[0][0].amount = 10920;
      scope.addDay(0);
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(18439.51, 2);
    });

    it('should return cost ~= 27659.27 given amounts of 10920 + 5460', function() {
      scope.fuelDays[0][0].amount = 10920;
      scope.$digest();
      scope.addDay(0);
      scope.$digest();
      scope.fuelDays[0][1].amount = 5460;
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(27659.27, 2);
    });

    it('should return cost ~= 18439.51 after removing a day', function() {
      scope.fuelDays[0][0].amount = 10920;
      scope.$digest();
      scope.addDay(0);
      scope.$digest();
      scope.fuelDays[0][1].amount = 5460;
      scope.$digest();
      scope.removeDay(0);
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(18439.51, 2);
    });

    it('should return cost = 0 after resetting days', function() {
      scope.fuelDays[0][0].amount = 10920;
      scope.$digest();
      scope.addDay(0);
      scope.$digest();
      scope.fuelDays[0][1].amount = 5460;
      scope.$digest();
      scope.resetDay(0);
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBe(0);
    });
    */

    it('should process possible values and return to 0 cost at end', function() {
      expect(scope.fuelTypeData[0].cost).toEqual(1.6886);
      scope.fuelDays[0][0].amount = 10920;
      scope.addDay(0);
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(18439.51, 2);
      scope.fuelDays[0][1].amount = 5460;
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(27659.27, 2);
      scope.removeDay(0);
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(18439.51, 2);
      scope.addDay(0);
      scope.fuelDays[0][1].amount = 5460;
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(27659.27, 2);
      scope.resetDay(0);
      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBe(0);
    });

    it('should show unsafe tank safety level', function() {
      scope.fuelTypeData[0].tankCapacity = 27000;
      scope.fuelTypeData[0].tankUllage = 10;
      scope.fuelTypeData[0].tankBalance = 10000;
      scope.fuelTypeData[0].estSales = 1000;
      scope.fuelDays[0][0].amount = 16380;
      scope.$digest();
      expect(scope.fuelTypeData[0].tankCapAfterUllage).toEqual(24300);
      expect(scope.fuelTypeData[0].tankSafety).toBeGreaterThan(100);
      expect(scope.tankSafetyClass[0]).toBe("unsafe");
    });
  });

  describe('Day number manipulation', function() {
    it('should disable the add day button at 5 days', function() {
      for (var i = 0; i < 3; i++)
        scope.addDay(0);
      scope.$digest();
      expect(scope.addButtonDisable[0]).toBe(false);
      scope.addDay(0);
      scope.$digest();
      expect(scope.addButtonDisable[0]).toBe(true);
    });

    it('should disable the remove day button at start, enable it after addDay call', function() {
      expect(scope.removeButtonDisable[0]).toBe(true);
      scope.addDay(0);
      scope.$digest();
      expect(scope.removeButtonDisable[0]).toBe(false);
    });

    it('should reset back to 1 day from any number of days', function() {
      for (var i = 0; i < 5; i++)
      {
        for (var j = 0; j < i; j++)
        {
          scope.addDay(0);
        }
        scope.$digest();
        scope.resetDay(0);
        scope.$digest();
        expect(scope.addButtonDisable[0]).toBe(false);
        expect(scope.removeButtonDisable[0]).toBe(true);
      }
    });
  });

  describe('$scope.isThereEnoughMoney function', function() {
    beforeEach(function() {
      scope.bankBalance = 100000;
    });

    it('should return neutral message when there are no deliveries', function() {
      scope.totalFuelReceivingCost = 0;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("default");
    });

    it('should return good message when balance > cost', function() {
      scope.totalFuelReceivingCost = 50000;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("safe");
    });

    it('should return bad message when balance < cost', function() {
      scope.totalFuelReceivingCost = 200000;
      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("unsafe");
    });
  });

  describe('Full functionality', function() {
    beforeEach(function() {
      scope.bankBalance = 500000;
      scope.fuelTypeData[0].price = 1.80;
      scope.fuelTypeData[1].price = 2.15;
      scope.fuelTypeData[2].price = 1.75;
      scope.fuelTypeData[0].commission = 0.1114;
      scope.fuelTypeData[1].commission = 0.1114;
      scope.fuelTypeData[2].commission = 0.0632;
    });

    it('should return good message', function() {
      for (var i = 0; i <= 2; i++)
        scope.addDay(i);

      scope.fuelDays[0][0].amount = 10920;
      scope.fuelDays[0][1].amount = 5460;
      scope.fuelDays[1][0].amount = 16380;
      scope.fuelDays[1][1].amount = 10920;
      scope.fuelDays[2][0].amount = 5460;
      scope.fuelDays[2][1].amount = 5460;

      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(27659.27, 2);
      expect(scope.fuelTypeData[1].sumOfFuelCost).toBeCloseTo(55653.78, 2);
      expect(scope.fuelTypeData[2].sumOfFuelCost).toBeCloseTo(18419.86, 2);
      expect(scope.totalFuelReceivingCost).toBeCloseTo(101732.90, 2);
      expect(scope.enoughMoneyMessageClass).toBe("safe");
    });

    it('should return bad message', function() {
      for (var i = 0; i <= 2; i++)
        scope.addDay(i);

      scope.fuelDays[0][0].amount = 10920;
      scope.fuelDays[0][1].amount = 5460;
      scope.fuelDays[1][0].amount = 1638000;
      scope.fuelDays[1][1].amount = 10920;
      scope.fuelDays[2][0].amount = 5460;
      scope.fuelDays[2][1].amount = 5460;

      scope.$digest();
      expect(scope.enoughMoneyMessageClass).toBe("unsafe");
    });
  });

});
