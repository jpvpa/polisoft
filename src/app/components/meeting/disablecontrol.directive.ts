import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisablecontrol]'
})
export class DisablecontrolDirective {
  @Input('appDisablecontrol') set appDisablecontrol( condition : boolean ) {
    const action = condition ? 'enable' : 'disable';
    this.ngControl.control[action]();
  }
  constructor(private ngControl : NgControl) { }

}
