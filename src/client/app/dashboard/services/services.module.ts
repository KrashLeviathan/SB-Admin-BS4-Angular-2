import {NgModule} from '@angular/core';

import {ServicesComponent} from './services.component';
import {CommonModule} from '@angular/common';
import {ServiceService} from './service.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ServicesComponent],
  exports: [ServicesComponent],
  providers: [ServiceService]
})

export class ServicesModule {
}
