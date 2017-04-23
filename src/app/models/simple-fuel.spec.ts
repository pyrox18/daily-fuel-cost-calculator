import { SimpleFuel } from './simple-fuel';

describe('SimpleFuel model', () => {
  let data: SimpleFuel;

  let setupMockValues = () => {
    data.fuelPrice = 2.20;
    data.fuelCommission = 0.15;
    data.fuelReceiving = 15000;
  }

  beforeEach(() => {
    data = new SimpleFuel();
  });

  it('should initialise correctly', () => {
    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
  });

  it('should return correct method values', () => {
    setupMockValues();

    expect(data.fuelCost()).toBeCloseTo(2.05, 2);
    expect(data.totalFuelCost()).toBeCloseTo(30750, 2);
  });

  it('should reset values correctly', () => {
    setupMockValues();
    data.resetValues();

    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
  });
});