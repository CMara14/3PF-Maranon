import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitleFont]',
  standalone: false
})
export class TitleFontDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize = '20px';
   }

}
