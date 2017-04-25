import { Component, OnInit } from '@angular/core';

import { FuelPriceService } from '../../services/fuel-price.service';
import { SimpleFuel } from '../../models/simple-fuel';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  inputData: SimpleFuel;
  bankBalance: number;

  constructor(
    private fuelPriceService: FuelPriceService
  ) { }

  ngOnInit() {
    this.bankBalance = 0.00;
    this.inputData = new SimpleFuel();
    this.fuelPriceService.getFuelPrices()
      .subscribe(
        data => {
          this.inputData.fuelPrice = this.fuelPriceService.fuelPrices[0].price;
        }
      );
  }

}
