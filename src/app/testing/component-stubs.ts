import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: ``
})

export class NavbarStubComponent { }

@Component({
  selector: 'app-bank-balance',
  template: ``
})

export class BankBalanceStubComponent {
  @Input() bankBalance;
  @Input() totalFuelCost;
}

@Component({
  selector: 'accordion',
  template: ``
})

export class AccordionStubComponent { }

@Component({
  selector: 'accordion-group',
  template: ``
})

export class AccordionGroupStubComponent {
  @Input() heading;
}