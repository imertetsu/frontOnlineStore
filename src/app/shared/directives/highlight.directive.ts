//importamos ElementRef para hacer uso del DOM
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef) {

  }

  @HostListener('mouseover') onMouseEnter(){
    this.elementRef.nativeElement.style.border = '1px solid red';
  }

  @HostListener('mouseout') onMouseLeave(){
    this.elementRef.nativeElement.style.border = 'none';
  }
}
