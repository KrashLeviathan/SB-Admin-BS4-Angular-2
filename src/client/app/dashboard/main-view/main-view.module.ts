import {NgModule} from '@angular/core';

import {MainViewComponent} from './main-view.component';
import {CommonModule} from '@angular/common';
import {ServiceModule} from '../shared/service/service.module';

@NgModule({
  imports: [CommonModule, ServiceModule],
  declarations: [MainViewComponent],
  exports: [MainViewComponent]
})

export class MainViewModule {
}
