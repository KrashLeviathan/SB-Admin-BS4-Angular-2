import {NgModule} from '@angular/core';

import {MainViewComponent} from './main-view.component';
import {CommonModule} from '@angular/common';
import {ServiceModule} from '../../shared/service/service.module';
import {UserService} from '../../shared/user/user.service';
import {MainViewAddServiceComponent} from './main-view-add-service.component';

@NgModule({
  imports: [CommonModule, ServiceModule],
  declarations: [MainViewComponent, MainViewAddServiceComponent],
  exports: [MainViewComponent, MainViewAddServiceComponent],
  providers: [UserService]
})

export class MainViewModule {
}
