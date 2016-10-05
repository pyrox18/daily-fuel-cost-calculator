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

  describe('Resetting values', function() {
    beforeEach(function() {
      for (var i = 0; i < 4; i++)
      {
        scope.addDay(i);
        scope.fuelTypeData[i].price = 1.80;
        scope.fuelTypeData[i].commission = 0.1114;
        scope.fuelTypeData[i].tankCapacity = 54000;
        scope.fuelTypeData[i].tankUllage = 12;
        scope.fuelTypeData[i].tankBalance = 15000;
        scope.fuelTypeData[i].estSales = 5000;
        scope.fuelDays[i][0].amount = 10920;
        scope.fuelDays[i][1].amount = 5460;
      }
      scope.$digest();
    });

    it('should reset fuel type values individually after manipulation', function() {
      for (var i = 0; i < 4; i++)
      {
        scope.resetFuelTypeValues(i);
        scope.$digest();

        expect(scope.fuelTypeData[i].commission).toEqual(0);
        expect(scope.fuelTypeData[i].tankCapacity).toEqual(27000);
        expect(scope.fuelTypeData[i].tankUllage).toEqual(10);
        expect(scope.fuelTypeData[i].tankBalance).toEqual(0);
        expect(scope.fuelTypeData[i].estSales).toEqual(0);
        expect(scope.fuelDays[i].length).toEqual(1);
      }
    });

    it('should reset all fuel type values at once after manipulation', function() {
      scope.resetAllValues();
      scope.$digest();

      for (var i = 0; i < 4; i++)
      {
        expect(scope.fuelTypeData[i].commission).toEqual(0);
        expect(scope.fuelTypeData[i].tankCapacity).toEqual(27000);
        expect(scope.fuelTypeData[i].tankUllage).toEqual(10);
        expect(scope.fuelTypeData[i].tankBalance).toEqual(0);
        expect(scope.fuelTypeData[i].estSales).toEqual(0);
        expect(scope.fuelDays[i].length).toEqual(1);
      }
    });
  });

  describe('Full functionality', function() {
    beforeEach(function() {
      scope.bankBalance = 500000;
      scope.fuelTypeData[0].price = 1.80;
      scope.fuelTypeData[1].price = 2.15;
      scope.fuelTypeData[2].price = 1.75;
      scope.fuelTypeData[3].price = 1.85;
      scope.fuelTypeData[0].commission = 0.1114;
      scope.fuelTypeData[1].commission = 0.1114;
      scope.fuelTypeData[2].commission = 0.0632;
      scope.fuelTypeData[3].commission = 0.0632;
      scope.fuelTypeData[0].tankCapacity = 54000;
      scope.fuelTypeData[1].tankCapacity = 27000;
      scope.fuelTypeData[2].tankCapacity = 27000;
      scope.fuelTypeData[3].tankCapacity = 27000;
      scope.fuelTypeData[0].tankUllage = 10;
      scope.fuelTypeData[1].tankUllage = 10;
      scope.fuelTypeData[2].tankUllage = 20;
      scope.fuelTypeData[3].tankUllage = 10;
      scope.fuelTypeData[0].tankBalance = 18900;
      scope.fuelTypeData[1].tankBalance = 10000;
      scope.fuelTypeData[2].tankBalance = 10000;
      scope.fuelTypeData[3].tankBalance = 0;
      scope.fuelTypeData[0].estSales = 5000;
      scope.fuelTypeData[1].estSales = 1000;
      scope.fuelTypeData[2].estSales = 500;
      scope.fuelTypeData[3].estSales = 0;
      scope.$digest();
    });

    it('should return sufficient balance with 1 tank over capacity', function() {
      for (var i = 0; i <= 3; i++)
        scope.addDay(i);

      scope.fuelDays[0][0].amount = 10920;
      scope.fuelDays[0][1].amount = 5460;
      scope.fuelDays[1][0].amount = 16380;
      scope.fuelDays[1][1].amount = 10920;
      scope.fuelDays[2][0].amount = 5460;
      scope.fuelDays[2][1].amount = 5460;
      scope.fuelDays[3][0].amount = 5460;
      scope.fuelDays[3][1].amount = 5460;

      scope.$digest();
      expect(scope.fuelTypeData[0].sumOfFuelCost).toBeCloseTo(27659.27, 2);
      expect(scope.fuelTypeData[1].sumOfFuelCost).toBeCloseTo(55653.78, 2);
      expect(scope.fuelTypeData[2].sumOfFuelCost).toBeCloseTo(18419.86, 2);
      expect(scope.fuelTypeData[3].sumOfFuelCost).toBeCloseTo(19511.86, 2);
      expect(scope.totalFuelReceivingCost).toBeCloseTo(121244.76, 2);
      expect(scope.tankSafetyClass).toEqual(["safe", "unsafe", "warning", "safe"]);
      expect(scope.unsafeTanks).toEqual([2]);
      expect(scope.enoughMoneyMessageClass).toBe("safe");
    });

    it('should return insufficient balance', function() {
      for (var i = 0; i <= 3; i++)
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
