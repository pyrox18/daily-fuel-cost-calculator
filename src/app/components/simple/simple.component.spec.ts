import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SimpleComponent } from './simple.component';
import { FuelPriceService } from '../../services/fuel-price.service';
import { fuelPriceServiceStub } from '../../testing/service-stubs';
import { BankBalanceStubComponent } from '../../testing/component-stubs';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ SimpleComponent, BankBalanceStubComponent ],
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
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialise correctly', () => {
    expect(component).toBeTruthy();
    expect(component.bankBalance).toBe(0.00);
    expect(component.inputData).toBeDefined();
    expect(component.inputData.fuelPrice).toBe(fuelPriceServiceStub.fuelPrices[0].price)
  });
});
