// Rounding errors are still unaccounted for - needs fixing later on

app.controller("standardModeController", function($scope, $http) {
  $scope.Math = window.Math;
  
  $http.get("data/fuelPriceData.js").then(function(response) {
    $scope.fuelData = response.data;
  });

  $scope.totalFuelReceivingCost = 0;
  $scope.bankBalance = 0;
  $scope.$watchGroup(['bankBalance', 'totalFuelReceivingCost'], function ()
  {
    $scope.cashDifference = $scope.bankBalance - $scope.totalFuelReceivingCost;
    $scope.isThereEnoughMoney($scope.bankBalance, $scope.totalFuelReceivingCost);
  });

  $scope.isThereEnoughMoney = function(balance, cost)
  {
    if (cost == 0)
    {
      $scope.enoughMoneyMessage = "No deliveries today?";
      $scope.enoughMoneyMessageClass = "default";
    } 
    else if (balance >= cost)
    {
      $scope.enoughMoneyMessage = "You have enough money in your bank balance for this delivery.";
      $scope.enoughMoneyMessageClass = "safe";
    }
    else
    {
      $scope.enoughMoneyMessage = "You need more money in your bank account!";
      $scope.enoughMoneyMessageClass = "unsafe";
    }
  }

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
    [
      {
        amount: 0,
        cost: 0
      }
    ],
    [
      {
        amount: 0,
        cost: 0
      }
    ],
    [
      {
        amount: 0,
        cost: 0
      }
    ]
  ];

  $scope.addButtonDisable = [false, false, false];
  $scope.removeButtonDisable = [false, false, false];

  // BUG: Fuel cost per day and total fuel cost does not update when fuel commission changes

  $scope.$watch('fuelTypeData', function ()
  {
    $scope.totalFuelReceivingCost = 0;
    for (var i = 0; i < $scope.fuelTypeData.length; i++)
    {
      //$scope.fuelTypeData[i].cost = (Math.round(100*($scope.fuelTypeData[i].price - $scope.fuelTypeData[i].commission)))/100;
      $scope.fuelTypeData[i].cost = $scope.fuelTypeData[i].price - $scope.fuelTypeData[i].commission;
      $scope.totalFuelReceivingCost += $scope.fuelTypeData[i].sumOfFuelCost;

      $scope.fuelTypeData[i].sumOfFuelAmount = 0;
      $scope.fuelTypeData[i].sumOfFuelCost = 0;
      for (var j = 0; j < $scope.fuelDays[i].length; j++)
      {
        $scope.fuelDays[i][j].cost = $scope.fuelTypeData[i].cost * $scope.fuelDays[i][j].amount;
        $scope.fuelTypeData[i].sumOfFuelAmount += $scope.fuelDays[i][j].amount;
        $scope.fuelTypeData[i].sumOfFuelCost += $scope.fuelDays[i][j].cost;
      }
    }
  }, true);
    
  $scope.$watch('fuelDays', function ()
  {
    for (var i = 0; i < $scope.fuelDays.length; i++)
    {
      if ($scope.fuelDays[i].length <= 1)
        $scope.removeButtonDisable[i] = true;
      else if ($scope.fuelDays[i].length >= 5)
        $scope.addButtonDisable[i] = true;
      else
      {
        $scope.addButtonDisable[i] = false;
        $scope.removeButtonDisable[i] = false;
      }
      $scope.fuelTypeData[i].sumOfFuelAmount = 0;
      $scope.fuelTypeData[i].sumOfFuelCost = 0;
      for (var j = 0; j < $scope.fuelDays[i].length; j++)
      {
        $scope.fuelDays[i][j].cost = $scope.fuelTypeData[i].cost * $scope.fuelDays[i][j].amount;
        $scope.fuelTypeData[i].sumOfFuelAmount += $scope.fuelDays[i][j].amount;
        $scope.fuelTypeData[i].sumOfFuelCost += $scope.fuelDays[i][j].cost;
      }
    }
  }, true);

  $scope.addDay = function (index)
  {
    $scope.fuelDays[index].push(
      {
        amount: 0,
        cost: 0
      }
    );
  };

  $scope.removeDay = function (index)
  {
    $scope.fuelDays[index].splice(-1, 1);
  }

  $scope.resetDay = function (index)
  {
    $scope.fuelDays[index].length = 0;
    $scope.addDay(index);
  }
});
