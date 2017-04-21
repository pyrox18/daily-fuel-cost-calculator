import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutletStubComponent } from './testing/router-stubs';
import { NavbarStubComponent } from './testing/component-stubs'

describe('AppComponent', () => {
  let fixture;
  let comp;
  let linkDes;
  let links;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarStubComponent,
        RouterOutletStubComponent
      ],
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

});
