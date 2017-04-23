import { Component, OnInit } from '@angular/core';

import { StandardFuel } from '../../models/standard-fuel';
import { FuelPriceService } from '../../services/fuel-price.service';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {

  inputData: StandardFuel[];
  bankBalance: number;
  totalFuelCost: number;

  constructor(
    private fuelPriceService: FuelPriceService
  ) { }

  ngOnInit() {
    this.bankBalance = 0.00;
    this.inputData = []
    for (let i = 0; i < 3; i++) {
      this.inputData.push(new StandardFuel());
      this.inputData[i].fuelPrice = this.fuelPriceService.fuelPrices[i].price;
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
    this.inputData[i].resetValues();
    this.inputData[i].fuelPrice = fuelPrice;
    this.recalcTotalFuelCost();
  }

  onFuelDataChange(index: number) {
    this.inputData[index].addUpFuelReceiving()
    this.inputData = this.inputData.slice();
    this.recalcTotalFuelCost();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
