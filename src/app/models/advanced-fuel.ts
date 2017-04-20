import { StandardFuel } from './standard-fuel';

export class AdvancedFuel extends StandardFuel {

  tankCapacity: number;
  tankUllage: number;
  tankBalance: number;
  oneDaySales: number;

  constructor() {
    super();
    this.tankCapacity = 0;
    this.tankUllage = 0;
    this.tankBalance = 0;
    this.oneDaySales = 0;
  }

  tankCapAfterUllage() {
    return this.tankCapacity * ((100 - this.tankUllage) / 100);
  }

  tankBalAfterDeliveryAndSales() {
    return this.tankBalance + this.fuelReceiving - this.oneDaySales;
  }

  tankSafety() {
    return (this.tankBalAfterDeliveryAndSales() / this.tankCapAfterUllage()) / 100;
  }

  resetValues(tankCapacity?: number) {
    super.resetValues();
    if (tankCapacity) {
      this.tankCapacity = tankCapacity;  
    }
    else {
      this.tankCapacity = 0;
    }
    this.tankUllage = 0;
    this.tankBalance = 0;
    this.oneDaySales = 0;
  }

}
