import {NgModule} from '@angular/core';

import {ServiceComponent} from './service.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ServiceComponent],
  exports: [ServiceComponent]
})

export class ServiceModule {
}
