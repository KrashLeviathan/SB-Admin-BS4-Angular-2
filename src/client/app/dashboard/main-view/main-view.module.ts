import {NgModule} from '@angular/core';

import {MainViewComponent} from './main-view.component';
import {CommonModule} from '@angular/common';
import {ServiceComponent} from '../shared/service/service.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MainViewComponent, ServiceComponent],
  exports: [MainViewComponent, ServiceComponent]
})

export class MainViewModule {
}
