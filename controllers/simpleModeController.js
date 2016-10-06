app.controller("simpleModeController", function($scope, $http) {
  $scope.Math = window.Math;

  $http.get("data/fuelPriceData.js").then(function(response) {
    $scope.fuelData = response.data;
    $scope.fuelPrice = $scope.fuelData.RON95;
  });

  $scope.bankBalance = 0;

  //$scope.fuelPrice = 1.80;
  //Initialisation of fuelPrice moved into http.get because of http.get's
  //lower priority

  $scope.fuelCommision = 0;
  $scope.$watchGroup(['fuelCommision', 'fuelPrice'], function ()
  {
    //$scope.fuelCost = (Math.round(100*($scope.fuelPrice - $scope.fuelCommision)))/100;
    $scope.fuelCost = $scope.fuelPrice - $scope.fuelCommision;
  })

  $scope.fuelReceivingAmount = 0;
  $scope.fuelReceivingCost = 0;
  $scope.$watchGroup(['fuelReceivingAmount', 'fuelCost'], function ()
  {
    $scope.fuelReceivingCost = $scope.fuelCost * $scope.fuelReceivingAmount;
  })

  $scope.cashDifference = $scope.bankBalance - $scope.fuelReceivingCost;
  $scope.$watchGroup(['fuelReceivingCost', 'bankBalance', 'fuelCost', 'fuelPrice'], function ()
  {
    $scope.cashDifference = $scope.bankBalance - $scope.fuelReceivingCost;
    $scope.isThereEnoughMoney($scope.bankBalance, $scope.fuelReceivingCost);
  })
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
});
