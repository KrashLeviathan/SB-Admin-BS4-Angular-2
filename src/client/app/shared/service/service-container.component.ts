import {Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {Service} from './service';
import {ServiceDirective} from './service.directive';

@Component({
  moduleId: module.id,
  selector: 'service-component',
  template: `
    <div class="tile-container" *ngIf="service">
      <template serviceHost></template>
    </div>`,
  styles: [
      `
      .tile-container {
        background-color: #b0e1ef;
        padding: 5px;
        height: 100%;
        width: 100%;
      }`]
})

export class ServiceContainer implements AfterViewInit {
  @Input() service: Service;
  @ViewChild(ServiceDirective) serviceHost: ServiceDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    setTimeout(() => this.loadComponent());
  }

  loadComponent() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.service.component);
    let viewContainerRef = this.serviceHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<Service>componentRef.instance).data = this.service.data;
    (<Service>componentRef.instance).name = this.service.name;
    (<Service>componentRef.instance).status = this.service.status;
  }
}
