app.controller("advancedModeController", function($scope, $http) {
  $scope.Math = window.Math;

  $http.get("data/fuelPriceData.js").then(function(response) {
    $scope.fuelData = response.data;
    $scope.fuelTypeData[0].price = $scope.fuelData["RON95"];
    $scope.fuelTypeData[1].price = $scope.fuelData["RON97"];
    $scope.fuelTypeData[2].price = $scope.fuelData["Diesel"];
    $scope.fuelTypeData[3].price = $scope.fuelData["Euro 5 Diesel"];
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
      $scope.enoughMoneyMessage = "Sufficient funds.";
      $scope.enoughMoneyMessageClass = "safe";
    }
    else
    {
      $scope.enoughMoneyMessage = "Insufficient funds!";
      $scope.enoughMoneyMessageClass = "unsafe";
    }
  }

  $scope.fuelTypeData = [
    {
      price: 1.80,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0,
      tankCapacity: 27000,
      tankUllage: 10,
      tankCapAfterUllage: 0,
      tankBalance: 0,
      tankSafety: 100,
      estSales: 0,
      expectedBalance: 0
    },
    {
      price: 2.15,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0,
      tankCapacity: 27000,
      tankUllage: 10,
      tankCapAfterUllage: 0,
      tankBalance: 0,
      tankSafety: 100,
      estSales: 0,
      expectedBalance: 0
    },
    {
      price: 1.75,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0,
      tankCapacity: 27000,
      tankUllage: 10,
      tankCapAfterUllage: 0,
      tankBalance: 0,
      tankSafety: 100,
      estSales: 0,
      expectedBalance: 0
    },
    {
      price: 1.85,
      commission: 0,
      cost: 0,
      sumOfFuelAmount: 0,
      sumOfFuelCost: 0,
      tankCapacity: 27000,
      tankUllage: 10,
      tankCapAfterUllage: 0,
      tankBalance: 0,
      tankSafety: 100,
      estSales: 0,
      expectedBalance: 0
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
    ],
    [
      {
        amount: 0,
        cost: 0
      }
    ]
  ];

  //$scope.featureTankData = false;

  $scope.addButtonDisable = [false, false, false, false];
  $scope.removeButtonDisable = [false, false, false, false];
  $scope.tankSafetyClass = ["default", "default", "default", "default"]
  $scope.unsafeTanks = [];
  $scope.unsafeTankStr = "none";
  $scope.isTankUnsafe = false;

  $scope.$watch('fuelTypeData', function ()
  {
    $scope.totalFuelReceivingCost = 0;
    for (var i = 0; i < $scope.fuelTypeData.length; i++)
    {
      //$scope.fuelTypeData[i].cost = (Math.round(100*($scope.fuelTypeData[i].price - $scope.fuelTypeData[i].commission)))/100;
      $scope.fuelTypeData[i].cost = $scope.fuelTypeData[i].price - $scope.fuelTypeData[i].commission;
      $scope.totalFuelReceivingCost += $scope.fuelTypeData[i].sumOfFuelCost;
      $scope.fuelTypeData[i].tankCapAfterUllage = $scope.fuelTypeData[i].tankCapacity * ((100 - $scope.fuelTypeData[i].tankUllage) / 100);

      $scope.fuelTypeData[i].sumOfFuelAmount = 0;
      $scope.fuelTypeData[i].sumOfFuelCost = 0;
      for (var j = 0; j < $scope.fuelDays[i].length; j++)
      {
        $scope.fuelDays[i][j].cost = $scope.fuelTypeData[i].cost * $scope.fuelDays[i][j].amount;
        $scope.fuelTypeData[i].sumOfFuelAmount += $scope.fuelDays[i][j].amount;
        $scope.fuelTypeData[i].sumOfFuelCost += $scope.fuelDays[i][j].cost;
      }

      $scope.fuelTypeData[i].expectedBalance = $scope.fuelTypeData[i].tankBalance + $scope.fuelTypeData[i].sumOfFuelAmount - $scope.fuelTypeData[i].estSales;
      $scope.fuelTypeData[i].tankSafety = ($scope.fuelTypeData[i].expectedBalance / $scope.fuelTypeData[i].tankCapAfterUllage) * 100;
      if ($scope.fuelTypeData[i].tankSafety >= 100)
      {
        $scope.tankSafetyClass[i] = "unsafe";
      }
      else if ($scope.fuelTypeData[i].tankSafety >= 90)
      {
        $scope.tankSafetyClass[i] = "warning";
      }
      else
      {
        $scope.tankSafetyClass[i] = "safe";
      }
    }

    $scope.unsafeTanks.length = 0;
    for (var i = 0; i < $scope.tankSafetyClass.length; i++)
    {
      if ($scope.tankSafetyClass[i] == "unsafe" && $scope.unsafeTanks.indexOf(i+1) == -1)
      {
	$scope.unsafeTanks.push(i+1);
      }
    }
    bubbleSort($scope.unsafeTanks);
    if ($scope.unsafeTanks.length == 0)
    {
      $scope.isTankUnsafe = false;
      $scope.unsafeTankStr = "none";
    }
    else
    {
      $scope.isTankUnsafe = true;
      if ($scope.unsafeTanks.length == 1)
      {
	$scope.unsafeTankStr = "" + $scope.unsafeTanks[0];
      }
      else
      {
	$scope.unsafeTankStr = "";
	for (var i = 0; i < $scope.unsafeTanks.length; i++)
	{
	  if (i == $scope.unsafeTanks.length - 1)
	    $scope.unsafeTankStr = $scope.unsafeTankStr + "and " + $scope.unsafeTanks[i];
	  else
	  {
	    if (i == $scope.unsafeTanks.length - 2)
	      $scope.unsafeTankStr = $scope.unsafeTankStr + $scope.unsafeTanks[i] + " ";
	    else
	      $scope.unsafeTankStr = $scope.unsafeTankStr + $scope.unsafeTanks[i] + ", ";
	  }
	}
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
    $scope.addButtonDisable[index] = false;
  }

  $scope.resetFuelTypeValues = function (index)
  {
    $scope.fuelTypeData[index].commission = 0;
    $scope.fuelTypeData[index].tankCapacity = 27000;
    $scope.fuelTypeData[index].tankUllage = 10;
    $scope.fuelTypeData[index].tankBalance = 0;
    $scope.fuelTypeData[index].estSales = 0;
    $scope.resetDay(index);
  }

  $scope.resetAllValues = function ()
  {
    $scope.bankBalance = 0;
    for (var i = 0; i < $scope.fuelTypeData.length; i++)
    {
      $scope.resetFuelTypeValues(i);
    }
  }

  function bubbleSort(a)
  {
    for (var i = a.length - 1; i > 0; i--)
    {
      for (var j = 0; j < i; j++)
      {
	if (a[j] > a[j+1])
	{
	  var temp = a[j+1];
	  a[j+1] = a[j];
	  a[j] = temp;
	}
      }
    }
  }

});
