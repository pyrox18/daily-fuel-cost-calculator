import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of'

@Injectable()
export class FuelPriceService {
  
  fuelPrices;

  constructor(
    private http: Http
  ) { }

  getFuelPrices() {
    if (!this.fuelPrices) {
      return this.http.get('https://quarkbackend.com/getfile/pyrox18/malaysiafuelprices')
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
