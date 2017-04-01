import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[serviceHost]',
})
export class ServiceDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
