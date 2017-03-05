import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap';
import {ModalModule} from 'ng2-bootstrap/ng2-bootstrap';

import {HomeModule} from './home/home.module';

import {DashboardComponent} from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {MainViewModule} from './main-view/main-view.module';
import {LogoutModule} from './logout/logout.module';
import {UserSettingsModule} from './user-settings/userSettings.module';
import {AccountSettingsModule} from './account-settings/accountSettings.module';
import {ServicesModule} from './services/services.module';
import {ManageViewsModule} from './manage-views/manage-views.module';
import {ManageUsersModule} from './manage-users/manage-users.module';
import {ServiceDetailModule} from './service/service-detail.module';


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
    AccountSettingsModule,
    ServiceDetailModule,
    ServicesModule,
    ManageViewsModule,
    ManageUsersModule
  ],
  declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
  exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule {
}
