import { AdvancedFuel } from './advanced-fuel';

describe('AdvancedFuel model', () => {
  let data: AdvancedFuel;

  let setupMockValues = () => {
    data.fuelPrice = 2.20;
    data.fuelCommission = 0.15;
    data.addDay();
    data.fuelReceivingByDay[0] = 10000;
    data.fuelReceivingByDay[1] = 5000;
    data.addUpFuelReceiving();
    data.tankCapacity = 27000;
    data.tankUllage = 10;
    data.tankBalance = 20000;
    data.oneDaySales = 15000;
  }

  beforeEach(() => {
    data = new AdvancedFuel();
  });

  it('should initialise correctly', () => {
    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
    expect(data.fuelReceivingByDay.length).toBe(1);
    expect(data.fuelReceivingByDay[0]).toBe(0);
    expect(data.tankCapacity).toBe(0);
    expect(data.tankUllage).toBe(0);
    expect(data.tankBalance).toBe(0);
    expect(data.oneDaySales).toBe(0);
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
    expect(data.tankCapAfterUllage()).toBeCloseTo(24300, 1);
    expect(data.tankBalAfterDeliveryAndSales()).toBeCloseTo(20000, 1);
    expect(data.tankSafety()).toBeCloseTo(82.305, 3);

    data.removeDay();
    expect(data.fuelReceiving).toBe(10000);
    expect(data.totalFuelCost()).toBeCloseTo(20500, 2);
    expect(data.tankBalAfterDeliveryAndSales()).toBeCloseTo(15000, 1);
    expect(data.tankSafety()).toBeCloseTo(61.728, 3);
  });

  it('should reset values correctly', () => {
    setupMockValues();
    data.resetValues();

    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
    expect(data.fuelReceivingByDay.length).toBe(1);
    expect(data.fuelReceivingByDay[0]).toBe(0);
    expect(data.tankCapacity).toBe(0);
    expect(data.tankUllage).toBe(0);
    expect(data.tankBalance).toBe(0);
    expect(data.oneDaySales).toBe(0);

    setupMockValues();
    data.resetValues(27000);

    expect(data.fuelPrice).toBe(0.00);
    expect(data.fuelCommission).toBe(0.00);
    expect(data.fuelReceiving).toBe(0);
    expect(data.fuelReceivingByDay.length).toBe(1);
    expect(data.fuelReceivingByDay[0]).toBe(0);
    expect(data.tankCapacity).toBe(27000);
    expect(data.tankUllage).toBe(0);
    expect(data.tankBalance).toBe(0);
    expect(data.oneDaySales).toBe(0);
  });
});