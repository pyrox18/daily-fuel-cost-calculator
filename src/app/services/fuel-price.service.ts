import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'

// IMPORTANT: GET request will be performed by dist version on fuel-price.json in ./dist/assets, NOT the url stated here
// Perform price changes on the dist version, leave the dev version as-is/use placeholders

@Injectable()
export class FuelPriceService {
  
  fuelPrices;

  constructor(
    private http: Http
  ) { }

  getFuelPrices() {
    if (!this.fuelPrices) {
      return this.http.get('https://api.myjson.com/bins/q0dwp')
        .map(res => res.json())
        .map(
          data => this.fuelPrices = data,
          err => console.error(err)
        );
    }
    else {
      return Observable.of(this.fuelPrices);
    }
  }

}
