app.controller("simpleModeController", function($scope, $http) {
  $scope.Math = window.Math;

  $scope.bankBalance = 0;
  
  $scope.fuelPrice = 1.70;
  $http.get("data/fuelPriceData.js").then(function(response) {
    $scope.fuelData = response.data;
  });
  
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
      $scope.enoughMoneyMessage = "You have enough money in your bank balance for this delivery.";
      $scope.enoughMoneyMessageClass = "safe";
    }
    else
    {
      $scope.enoughMoneyMessage = "You need more money in your bank account!";
      $scope.enoughMoneyMessageClass = "unsafe";
    }
  }
});
