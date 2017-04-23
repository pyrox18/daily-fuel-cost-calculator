import { StandardFuel } from './standard-fuel';

describe('StandardFuel model', () => {
  let data: StandardFuel;

  let setupMockValues = () => {
    data.fuelPrice = 2.20;
    data.fuelCommission = 0.15;
    data.addDay();
    data.fuelReceivingByDay[0] = 10000;
    data.fuelReceivingByDay[1] = 5000;
    data.addUpFuelReceiving();
  }

  beforeEach(() => {
    data = new StandardFuel();
  });

  it('should initialise correctly', () => {
    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
    expect(data.fuelReceivingByDay.length).toBe(1);
    expect(data.fuelReceivingByDay[0]).toBe(0);
  });

  it('should add and remove days correctly', () => {
    for (let i = 2; i <= 3; i++) {
      data.addDay();
      expect(data.fuelReceivingByDay.length).toBe(i);
    }
    for (let i = 2; i >= 1; i--) {
      data.removeDay();
      expect(data.fuelReceivingByDay.length).toBe(i);
    }
  });

  it('should return correct method values', () => {
    setupMockValues();

    expect(data.fuelReceiving).toBe(15000);
    expect(data.fuelCost()).toBeCloseTo(2.05, 2);
    expect(data.totalFuelCost()).toBeCloseTo(30750, 2);

    data.removeDay();
    expect(data.fuelReceiving).toBe(10000);
    expect(data.totalFuelCost()).toBeCloseTo(20500, 2);
  });

  it('should reset values correctly', () => {
    setupMockValues();
    data.resetValues();

    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
    expect(data.fuelReceivingByDay.length).toBe(1);
    expect(data.fuelReceivingByDay[0]).toBe(0);
  });
});