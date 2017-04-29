import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AccordionModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { FuelPriceService } from './services/fuel-price.service';

import { AppComponent } from './app.component';
import { SimpleComponent } from './components/simple/simple.component';
import { StandardComponent } from './components/standard/standard.component';
import { AdvancedComponent } from './components/advanced/advanced.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BankBalanceComponent } from './components/bank-balance/bank-balance.component';
import { FloatsOnlyDirective } from './directives/floats-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    StandardComponent,
    AdvancedComponent,
    PageNotFoundComponent,
    AboutComponent,
    NavbarComponent,
    BankBalanceComponent,
    FloatsOnlyDirective
  ],
  imports: [
    AccordionModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    FuelPriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
