app.controller("fuelCalcController", function($scope) {
  $scope.Math = window.Math;
  $scope.test = "Hello!";
  $scope.bankBalance = 0;
  $scope.bankBalanceInput = "";
  $scope.bankBalanceIsNumber = angular.isNumber($scope.bankBalance);
  $scope.fuelPrice = 1.65;
  $scope.fuelCommision = 0;
  $scope.fuelCost = $scope.fuelPrice - $scope.fuelCommision;
  $scope.$watch('fuelCommision', function ()
  {
    $scope.fuelCost = (Math.round(100*($scope.fuelPrice - $scope.fuelCommision)))/100;
  })
  $scope.fuelReceivingAmount = 0;
  $scope.fuelReceivingCost = 0;
  $scope.$watch('fuelReceivingAmount', function ()
  {
    $scope.fuelReceivingCost = $scope.fuelCost * $scope.fuelReceivingAmount;
  })
  $scope.cashDifference = $scope.bankBalance - $scope.fuelReceivingCost;
  $scope.$watch('fuelReceivingCost', function ()
  {
    $scope.cashDifference = $scope.bankBalance - $scope.fuelReceivingCost;
    $scope.isThereEnoughMoney($scope.bankBalance, $scope.fuelReceivingCost);
  })
  $scope.isThereEnoughMoney = function(balance, cost)
  {
    if (cost == 0)
      $scope.enoughMoneyMessage = "No deliveries today?";
    else if (balance >= cost)
      $scope.enoughMoneyMessage = "You have enough money in your bank balance for this delivery.";
    else
      $scope.enoughMoneyMessage = "You need more money in your bank account!";
  }
});
