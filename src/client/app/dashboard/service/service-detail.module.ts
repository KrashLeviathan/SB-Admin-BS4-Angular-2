import {NgModule} from '@angular/core';

import {ServiceDetailComponent} from './service-detail.component';
import {CommonModule} from '@angular/common';
import {ServiceService} from '../shared/service/service.service';
import {ServiceConfigComponent} from './service-config/service-config.component';
import {ServiceTileComponent} from '../service-tile/service-tile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ServiceDetailComponent, ServiceConfigComponent, ServiceTileComponent],
  exports: [ServiceDetailComponent, ServiceConfigComponent],
  providers: [ServiceService]
})

export class ServiceDetailModule {
}
