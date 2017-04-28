import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { FuelPriceService } from './fuel-price.service';

describe('FuelPriceService', () => {
  let service: FuelPriceService;

  it('should create service and possess fuel prices', () => {
    const fakeHttp = {};
    service = new FuelPriceService(fakeHttp as Http);
    const spy = spyOn(service, 'getFuelPrices').and.callFake(() => {
      service.fuelPrices = [
        {
          "name": "RON95",
          "price": 2.20
        },
        {
          "name": "RON97",
          "price": 2.50
        },
        {
          "name": "Diesel",
          "price": 2.05
        },
        {
          "name": "Euro 5 Diesel",
          "price": 2.15
        }
      ]
    });

    service.getFuelPrices();
    expect(service).toBeTruthy();
    expect(service.fuelPrices[0].name).toBe("RON95");
    expect(service.fuelPrices[0].price).toBeTruthy();
  });
});
