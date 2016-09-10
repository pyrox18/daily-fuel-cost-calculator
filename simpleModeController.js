app.controller("simpleModeController", function($scope) {
  $scope.Math = window.Math;

  $scope.bankBalance = 0;
  
  $scope.fuelPrice = 1.70;
  $scope.fuelCommision = 0;
  $scope.$watch('fuelCommision', function ()
  {
    $scope.fuelCost = (Math.round(100*($scope.fuelPrice - $scope.fuelCommision)))/100;
  })
  
  $scope.fuelReceivingAmount = 0;
  $scope.fuelReceivingCost = 0;
  $scope.$watchGroup(['fuelReceivingAmount', 'fuelCost'], function ()
  {
    $scope.fuelReceivingCost = $scope.fuelCost * $scope.fuelReceivingAmount;
  })
  
  $scope.cashDifference = $scope.bankBalance - $scope.fuelReceivingCost;
  $scope.$watchGroup(['fuelReceivingCost', 'bankBalance', 'fuelCost'], function ()
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
