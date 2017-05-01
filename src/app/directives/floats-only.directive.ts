import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appFloatsOnly]'
})
export class FloatsOnlyDirective {

  @Input() ngModel;
  @Output() ngModelChange = new EventEmitter();

  constructor(
    private el: ElementRef
  ) { }

  //TODO: change behaviour when non-numerical input is given (currently resets entire field)

  @HostListener('input') modifyInput() {
    const regex = /[^\d\.]/g;
    let inputValue = this.el.nativeElement.value;

    if (inputValue == '') {
      // Change field to always have a 0
      this.el.nativeElement.value = 0;
      this.ngModelChange.emit(0);
    }

    // Replace non-digit and non-decimal characters with ''
    let transformedInput = inputValue.toString().replace(regex, '');
    if (transformedInput != inputValue) {
      this.el.nativeElement.value = transformedInput;
    }

    // Remove leading 0 if input >= 1
    if (this.el.nativeElement.value >= 1 && this.el.nativeElement.value[0] == 0) {
      let newStr = this.el.nativeElement.value;
      while (newStr[0] == 0) {
        newStr = newStr.slice(1);
      }
      this.el.nativeElement.value = newStr;
    }
  }

}
