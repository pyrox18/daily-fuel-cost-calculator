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

  // BUG: Fuel cost per day and total fuel cost does not update when fuel commission changes

  $scope.$watch('fuelTypeData', function ()
  {
    $scope.totalFuelReceivingCost = 0;
    for (var i = 0; i < $scope.fuelTypeData.length; i++)
    {
      $scope.fuelTypeData[i].cost = (Math.round(100*($scope.fuelTypeData[i].price - $scope.fuelTypeData[i].commission)))/100;
      $scope.totalFuelReceivingCost += $scope.fuelTypeData[i].sumOfFuelCost;
    }
  }, true);
    
  $scope.$watch('fuelDays', function ()
  {
    $scope.fuelTypeData[0].sumOfFuelAmount = 0;
    $scope.fuelTypeData[0].sumOfFuelCost = 0;
    for (var i = 0; i < $scope.fuelDays.length; i++)
    {
      $scope.fuelDays[0][i].cost = $scope.fuelTypeData[0].cost * $scope.fuelDays[0][i].amount;
      $scope.fuelTypeData[0].sumOfFuelAmount += $scope.fuelDays[0][i].amount;
      $scope.fuelTypeData[0].sumOfFuelCost += $scope.fuelDays[0][i].cost;
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
});
