import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AdvancedComponent } from './advanced.component';
import { FuelPriceService } from '../../services/fuel-price.service';
import { fuelPriceServiceStub } from '../../testing/service-stubs';
import { BankBalanceStubComponent, AccordionStubComponent, AccordionGroupStubComponent } from '../../testing/component-stubs';

describe('AdvancedComponent', () => {
  let component: AdvancedComponent;
  let fixture: ComponentFixture<AdvancedComponent>;

  let setupMockValues = () => {
    for (let data of component.inputData) {
      data.fuelCommission = 0.15;
      data.tankBalance = 20000;
      data.oneDaySales = 15000;
      data.fuelReceivingByDay[0] = 15000;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AdvancedComponent,
        BankBalanceStubComponent,
        AccordionStubComponent,
        AccordionGroupStubComponent
      ],
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
    fixture = TestBed.createComponent(AdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialise correctly', () => {
    expect(component).toBeTruthy();
    expect(component.bankBalance).toBe(0.00);
    expect(component.inputData.length).toBe(4);
    for (let i = 0; i < component.inputData.length; i++) {
      expect(component.inputData[i]).toBeDefined();
      expect(component.inputData[i].fuelPrice).toBe(fuelPriceServiceStub.fuelPrices[i].price);
      expect(component.inputData[i].tankCapacity).toBe(AdvancedComponent.tankCapacityDefault);
      expect(component.inputData[i].tankUllage).toBe(AdvancedComponent.tankUllageDefault);
    }
    expect(component.totalFuelCost).toBe(0);
  });

  it('should recalculate total fuel cost', () => {
    setupMockValues();
    for (let i = 0; i < component.inputData.length; i++) {
      component.onFuelDataChange(i);
    }
    expect(component.totalFuelCost).toBeCloseTo(124500, 2);
    component.addDay(0);
    component.inputData[0].fuelReceivingByDay[1] = 5000;
    component.onFuelDataChange(0);
    expect(component.totalFuelCost).toBeCloseTo(134750, 2);
    component.removeDay(0);
    expect(component.totalFuelCost).toBeCloseTo(124500, 2);
    component.resetFuelData(2);
    expect(component.totalFuelCost).toBeCloseTo(96000, 2);
  });

  it('should reset values correctly', () => {
    setupMockValues();
    component.resetAllValues();
    expect(component.bankBalance).toBe(0.00);
    for (let i = 0; i < component.inputData.length; i++) {
      expect(component.inputData[i].tankCapacity).toBe(AdvancedComponent.tankCapacityDefault);
      expect(component.inputData[i].tankUllage).toBe(AdvancedComponent.tankUllageDefault);
    }
  });

  it('should return correct tank safety classes', () => {
    expect(component.tankSafetyClass(101)).toBe("text-danger");
    expect(component.tankSafetyClass(100)).toBe("text-danger");
    expect(component.tankSafetyClass(99)).toBe("text-warning");
    expect(component.tankSafetyClass(91)).toBe("text-warning");
    expect(component.tankSafetyClass(90)).toBe("text-warning");
    expect(component.tankSafetyClass(89)).toBe("text-success");
  });
});
