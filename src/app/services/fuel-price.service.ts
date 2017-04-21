import { Injectable } from '@angular/core';

import { fuelPrices } from '../fuel-price';

@Injectable()
export class FuelPriceService {

  fuelPrices = fuelPrices;

  constructor() { }

}
