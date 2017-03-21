import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DropdownModule, AlertModule, ModalModule} from 'ng2-bootstrap/ng2-bootstrap';

import {HomeModule} from './home/home.module';

import {DashboardComponent} from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {MainViewModule} from './main-view/main-view.module';
import {LogoutModule} from './logout/logout.module';
import {UserSettingsModule} from './user-settings/userSettings.module';
import {HouseholdSettingsModule} from './household-settings/householdSettings.module';
import {ServicesModule} from './services/services.module';
import {ManageViewsModule} from './manage-views/manage-views.module';
import {ManageUsersModule} from './manage-users/manage-users.module';
import {ServiceDetailModule} from './service-detail/service-detail.module';
import {PopoverControllerComponent} from '../shared/popover-controller/popover-controller';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    ModalModule,
    HomeModule,
    MainViewModule,
    LogoutModule,
    UserSettingsModule,
    HouseholdSettingsModule,
    ServiceDetailModule,
    ServicesModule,
    ManageViewsModule,
    ManageUsersModule,
    AlertModule
  ],
  declarations: [DashboardComponent, TopNavComponent, SidebarComponent, PopoverControllerComponent],
  exports: [DashboardComponent, TopNavComponent, SidebarComponent, PopoverControllerComponent]
})

export class DashboardModule {
}
