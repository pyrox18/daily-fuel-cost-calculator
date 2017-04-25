import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { StandardComponent } from './standard.component';
import { FuelPriceService } from '../../services/fuel-price.service';
import { fuelPriceServiceStub } from '../../testing/service-stubs';
import { BankBalanceStubComponent } from '../../testing/component-stubs';

describe('StandardComponent', () => {
  let component: StandardComponent;
  let fixture: ComponentFixture<StandardComponent>;

  let setupMockValues = () => {
    for (let data of component.inputData) {
      data.fuelCommission = 0.15;
      data.fuelReceivingByDay[0] = 15000;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ StandardComponent, BankBalanceStubComponent ],
      providers: [
        {
          provide: FuelPriceService,
          useValue: fuelPriceServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    expect(component.bankBalance).toBe(0.00);
    expect(component.inputData.length).toBe(3);
    for (let i = 0; i < component.inputData.length; i++) {
      expect(component.inputData[i]).toBeDefined();
      expect(component.inputData[i].fuelPrice).toBe(fuelPriceServiceStub.fuelPrices[i].price);
    }
    expect(component.totalFuelCost).toBe(0);
  });

  it('should recalculate total fuel cost', () => {
    setupMockValues();
    for (let i = 0; i <= 2; i++) {
      component.onFuelDataChange(i);
    }
    expect(component.totalFuelCost).toBeCloseTo(94500, 2);
    component.addDay(0);
    component.inputData[0].fuelReceivingByDay[1] = 5000;
    component.onFuelDataChange(0);
    expect(component.totalFuelCost).toBeCloseTo(104750, 2);
    component.removeDay(0);
    expect(component.totalFuelCost).toBeCloseTo(94500, 2);
    component.resetFuelData(2);
    expect(component.totalFuelCost).toBeCloseTo(66000, 2);
  });
});
