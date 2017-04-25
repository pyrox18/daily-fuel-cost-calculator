import { Component, OnChanges, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-balance',
  templateUrl: './bank-balance.component.html',
  styleUrls: ['./bank-balance.component.css']
})
export class BankBalanceComponent implements OnInit, OnChanges {

  @Input() bankBalance: number;
  @Input() totalFuelCost: number;
  finalBalance: number;

  constructor() { }

  ngOnInit() {
    if (this.bankBalance && this.totalFuelCost) {
      this.finalBalance = this.bankBalance - this.totalFuelCost;  
    }
    else {
      this.finalBalance = 0;
    }
  }

  ngOnChanges() {
    this.finalBalance = this.bankBalance - this.totalFuelCost;
  }

}
