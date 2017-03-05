import {NgModule} from '@angular/core';

import {ServicesComponent} from './services.component';
import {CommonModule} from '@angular/common';
import {ServiceService} from '../shared/service/service.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ServicesComponent],
  exports: [ServicesComponent, RouterModule],
  providers: [ServiceService]
})

export class ServicesModule {
}
