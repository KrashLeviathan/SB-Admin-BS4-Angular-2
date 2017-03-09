import {NgModule} from '@angular/core';

import {MainViewComponent} from './main-view.component';
import {CommonModule} from '@angular/common';
import {ServiceModule} from '../shared/service/service.module';
import {UserService} from '../shared/user/user.service';

@NgModule({
  imports: [CommonModule, ServiceModule],
  declarations: [MainViewComponent],
  exports: [MainViewComponent],
  providers: [UserService]
})

export class MainViewModule {
}
