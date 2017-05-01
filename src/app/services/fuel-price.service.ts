import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

// IMPORTANT: GET request will be performed by dist version on fuel-price.json in ./dist/assets, NOT the url stated here
// Perform price changes on the dist version, leave the dev version as-is/use placeholders

@Injectable()
export class FuelPriceService {
  
  fuelPrices;

  constructor(
    private http: Http
  ) { }

  getFuelPrices() {
    return this.http.get('../../assets/fuel-price.json')
      .map(res => res.json())
      .map(
        data => this.fuelPrices = data,
        err => console.error(err)
      );
  }

}
