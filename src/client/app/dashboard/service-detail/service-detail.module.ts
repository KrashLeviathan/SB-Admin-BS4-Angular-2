import {NgModule} from '@angular/core';

import {ServiceDetailComponent} from './service-detail.component';
import {CommonModule} from '@angular/common';
import {ServiceService} from '../shared/service/service.service';
import {ServiceConfigComponent} from './service-config/service-config.component';
import {ServiceTileComponent} from '../service-tile/service-tile.component';
import {NewServiceComponent} from './new-service/new-service.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ServiceDetailComponent,
    ServiceConfigComponent,
    ServiceTileComponent,
    NewServiceComponent
  ],
  exports: [
    ServiceDetailComponent,
    ServiceConfigComponent,
    NewServiceComponent,
    RouterModule
  ],
  providers: [ServiceService]
})

export class ServiceDetailModule {
}
