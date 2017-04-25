import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBalanceComponent } from './bank-balance.component';

describe('BankBalanceComponent', () => {
  let component: BankBalanceComponent;
  let fixture: ComponentFixture<BankBalanceComponent>;
  let expectedBankBalance: number;
  let expectedTotalFuelCost: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBalanceComponent);
    component = fixture.componentInstance;
    expectedBankBalance = 100000;
    expectedTotalFuelCost = 50000;
    component.bankBalance = expectedBankBalance;
    component.totalFuelCost = expectedTotalFuelCost;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.finalBalance).toBeDefined();
  });

  it('should calculate final balance', () => {
    expect(component.finalBalance).toBeCloseTo(50000, 2);
  });
});
