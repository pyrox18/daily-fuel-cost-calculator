import { Component, OnInit } from '@angular/core';

import { AdvancedFuel } from '../../models/advanced-fuel';
import { FuelPriceService } from '../../services/fuel-price.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {

  static tankCapacityDefault: number = 27000;
  static tankUllageDefault: number = 10;

  inputData: AdvancedFuel[];
  bankBalance: number;
  totalFuelCost: number;

  constructor(
    private fuelPriceService: FuelPriceService
  ) { }

  ngOnInit() {
    this.bankBalance = 0.00;
    this.inputData = []
    for (let i = 0; i < 4; i++) {
      this.inputData.push(new AdvancedFuel());
      this.inputData[i].fuelPrice = this.fuelPriceService.fuelPrices[i].price;
      this.inputData[i].tankCapacity = AdvancedComponent.tankCapacityDefault;
      this.inputData[i].tankUllage = AdvancedComponent.tankUllageDefault;
    }
    this.totalFuelCost = 0;
  }

  recalcTotalFuelCost() {
    this.totalFuelCost = 0;
    for (let data of this.inputData) {
      this.totalFuelCost += data.totalFuelCost();
    }
  }

  addDay(i: number) {
    this.inputData[i].addDay();
  }

  removeDay(i: number) {
    this.inputData[i].removeDay();
    this.recalcTotalFuelCost();
  }

  resetFuelData(i: number) {
    let fuelPrice = this.inputData[i].fuelPrice;
    this.inputData[i].resetValues(AdvancedComponent.tankCapacityDefault);
    this.inputData[i].tankUllage = AdvancedComponent.tankUllageDefault;
    this.inputData[i].fuelPrice = fuelPrice;
    this.recalcTotalFuelCost();
  }

  resetAllValues() {
    for (let i = 0; i < this.inputData.length; i++) {
      this.resetFuelData(i);
    }
  }

  onFuelDataChange(index: number) {
    this.inputData[index].addUpFuelReceiving()
    this.inputData = this.inputData.slice();
    this.recalcTotalFuelCost();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  tankSafetyClass(tankSafety: number) {
    if (tankSafety >= 100) {
      return "text-danger";
    }
    else if (tankSafety >= 90) {
      return "text-warning";
    }
    else {
      return "text-success";
    }
  }

  hasUnsafeTanks() {
    for (let data of this.inputData) {
      if (data.tankSafety() >= 100) {
        return true;
      }
    }
    return false;
  }

  unsafeTanksStr() {
    let unsafeTanks: number[] = [];
    let unsafeTanksStr: string = "";
    
    for (let i = 0; i < this.inputData.length; i++) {
      if (this.inputData[i].tankSafety() >= 100) {
        unsafeTanks.push(i+1);
      }
    }

    if (unsafeTanks.length >= 1) {
      unsafeTanksStr += unsafeTanks[0].toString();
      if (unsafeTanks.length >= 2) {
        if (unsafeTanks.length > 2) {
          for (let i = 1; i < unsafeTanks.length - 1; i++) {
            unsafeTanksStr += ", " + unsafeTanks[i].toString();
          }
        }
        unsafeTanksStr += " and " + unsafeTanks[unsafeTanks.length - 1].toString();
      }
    }
    
    return unsafeTanksStr;
  }

}
