import { TestBed, inject } from '@angular/core/testing';

import { FuelPriceService } from './fuel-price.service';

describe('FuelPriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuelPriceService]
    });
  });

  it('should create service and possess fuel prices', inject([FuelPriceService], (service: FuelPriceService) => {
    expect(service).toBeTruthy();
    expect(service.fuelPrices[0].name).toBe("RON95");
    expect(service.fuelPrices[0].price).toBeTruthy();
  }));
});
