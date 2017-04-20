import { SimpleFuel } from './simple-fuel';

export class StandardFuel extends SimpleFuel {

  fuelReceivingByDay: number[];

  constructor() {
    super();
    this.fuelReceivingByDay = [];
    this.fuelReceivingByDay.push(0);
    this.addUpFuelReceiving();
  }

  addUpFuelReceiving() {
    this.fuelReceiving = 0;
    for (let i of this.fuelReceivingByDay) {
      this.fuelReceiving += i;
    }
  }

  addDay() {
    this.fuelReceivingByDay.push(0);
  }

  removeDay() {
    this.fuelReceivingByDay.pop();
    this.addUpFuelReceiving();
  }

  resetValues() {
    super.resetValues();
    this.fuelReceivingByDay = [];
    this.fuelReceivingByDay.push(0);
    this.addUpFuelReceiving();
  }

}
