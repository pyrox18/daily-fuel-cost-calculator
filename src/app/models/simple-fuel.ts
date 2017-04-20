export class SimpleFuel {
  
  fuelPrice: number;
  fuelCommission: number;
  fuelReceiving: number;

  constructor() {
    this.resetValues();
  }

  fuelCost() {
    return this.fuelPrice - this.fuelCommission;
  }

  totalFuelCost() {
    return this.fuelReceiving * this.fuelCost();
  }

  resetValues() {
    this.fuelPrice = 0.00;
    this.fuelCommission = 0.00;
    this.fuelReceiving = 0;
  }

}
