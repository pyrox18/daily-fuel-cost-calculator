import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-bank-balance',
  templateUrl: './bank-balance.component.html',
  styleUrls: ['./bank-balance.component.css']
})
export class BankBalanceComponent implements OnChanges {

  @Input() bankBalance: number;
  @Input() totalFuelCost: number;
  finalBalance: number;

  constructor() { }

  ngOnChanges() {
    this.finalBalance = this.bankBalance - this.totalFuelCost;
  }

}
