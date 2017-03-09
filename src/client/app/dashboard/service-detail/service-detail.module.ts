import {NgModule} from '@angular/core';

import {ServiceDetailComponent} from './service-detail.component';
import {CommonModule} from '@angular/common';
import {ServiceService} from '../shared/service/service.service';
import {ServiceConfigComponent} from './service-config/service-config.component';
import {NewServiceComponent} from './new-service/new-service.component';
import {RouterModule} from '@angular/router';
import {ServiceModule} from '../shared/service/service.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ServiceModule
  ],
  declarations: [
    ServiceDetailComponent,
    ServiceConfigComponent,
    NewServiceComponent
  ],
  exports: [
    ServiceDetailComponent,
    ServiceConfigComponent,
    NewServiceComponent
  ],
  providers: [ServiceService]
})

export class ServiceDetailModule {
}
