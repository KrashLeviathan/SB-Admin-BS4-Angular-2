import { NgModule } from '@angular/core';

import { ServicesComponent } from './services.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ServicesComponent],
  exports: [ServicesComponent]
})

export class ServicesModule { }
