app.controller("standardModeController", function($scope, $http) {
  $scope.Math = window.Math;
  
  $http.get("data/fuelPriceData.js").then(function(response) {
    $scope.fuelData = response.data;
  });

  $scope.totalFuelReceivingCost = 0;
  $scope.bankBalance = 0;

  $scope.fuelTypeData = [
    {
      price: 1.70,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0
    },
    {
      price: 2.05,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0
    },
    {
      price: 1.80,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0
    }
  ];

  $scope.fuelDays = [
    {
      amount: 0,
      cost: 0
    }
  ];

  // BUG: Fuel cost per day and total fuel cost does not update when fuel commission changes

  $scope.$watch('fuelTypeData', function ()
  {
    for (var i = 0; i < $scope.fuelTypeData.length; i++)
    {
      $scope.fuelTypeData[i].cost = (Math.round(100*($scope.fuelTypeData[i].price - $scope.fuelTypeData[i].commission)))/100;
    }
  }, true);

  $scope.$watch('fuelDays', function ()
  {
    for (var i = 0; i < $scope.fuelDays.length; i++)
    {
      $scope.fuelDays[i].cost = $scope.fuelTypeData[0].cost * $scope.fuelDays[i].amount;
      /*if ($scope.isAddDay == false)
      {
        $scope.fuelTypeData[0].sumOfFuelAmount = 0;
        $scope.fuelTypeData[0].sumOfFuelCost = 0;
      }
      else
        $scope.isAddDay = false;
      //$scope.fuelTypeData[0].sumOfFuelAmount = 0;
      $scope.fuelTypeData[0].sumOfFuelAmount += $scope.fuelDays[i].amount;
      //$scope.fuelTypeData[0].sumOfFuelCost = 0;
      $scope.fuelTypeData[0].sumOfFuelCost += $scope.fuelDays[i].cost;*/
    }
    for (var i = 0; i < $scope.fuelDays.length; i++)
    {
      //if ($scope.isAddDay == true)
      //{
        var tempAmount = $scope.fuelTypeData[0].sumOfFuelAmount;
        var tempCost = $scope.fuelTypeData[0].sumOfFuelCost;
        $scope.fuelTypeData[0].sumOfFuelAmount = 0;
        $scope.fuelTypeData[0].sumOfFuelCost = 0;
        //$scope.isAddDay = false;
      //}
      //$scope.fuelTypeData[0].sumOfFuelAmount = 0;
      $scope.fuelTypeData[0].sumOfFuelAmount += $scope.fuelDays[i].amount;
      //$scope.fuelTypeData[0].sumOfFuelCost = 0;
      $scope.fuelTypeData[0].sumOfFuelCost += $scope.fuelDays[i].cost;
    }
  }, true);

  $scope.addDay = function ()
  {
    $scope.fuelDays.push(
      {
        amount: 0,
        cost: 0
      }
    )
    $scope.isAddDay = true;
  };

  $scope.removeDay = function()
  {
    $scope.fuelDays.splice(-1, 1);
  }
  
  $scope.enoughMoneyMessage = "Standard mode is still in development - check back later!";
});
