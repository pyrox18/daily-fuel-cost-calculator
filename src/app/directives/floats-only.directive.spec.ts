import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FloatsOnlyDirective } from './floats-only.directive';

describe('FloatsOnlyDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FloatsOnlyDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.directive(FloatsOnlyDirective));
  });

  it('should manipulate input values', () => {
    const input = de.nativeElement as HTMLInputElement;

    input.value = "";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe("0");
    expect(component.modelValue).toBe(0);

    input.value = "0123.45";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe("123.45");
    expect(component.modelValue).toBeCloseTo(123.45, 2);
  });
});

@Component({
  template: `
    <input type="number" appFloatsOnly [(ngModel)]="modelValue">
  `
})
class TestComponent {
  modelValue: number = 0;
}