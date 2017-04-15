import { DailyFuelCostCalculatorPage } from './app.po';

describe('daily-fuel-cost-calculator App', () => {
  let page: DailyFuelCostCalculatorPage;

  beforeEach(() => {
    page = new DailyFuelCostCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
