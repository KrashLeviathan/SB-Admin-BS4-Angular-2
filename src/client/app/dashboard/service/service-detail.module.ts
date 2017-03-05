import {NgModule} from '@angular/core';

import {ServiceDetailComponent} from './service-detail.component';
import {CommonModule} from '@angular/common';
import {ServiceService} from '../service.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ServiceDetailComponent],
  exports: [ServiceDetailComponent],
  providers: [ServiceService]
})

export class ServiceDetailModule {
}
