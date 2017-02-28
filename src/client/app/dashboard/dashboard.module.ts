import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DropdownModule} from 'ng2-bootstrap/ng2-bootstrap';
import {ModalModule} from 'ng2-bootstrap/ng2-bootstrap';

import {HomeModule} from './home/home.module';
import {ChartModule} from './charts/chart.module';
import {BlankPageModule} from './blank-page/blankPage.module';
import {TableModule} from './tables/table.module';
import {FormModule} from './forms/forms.module';
import {GridModule} from './grid/grid.module';
import {BSComponentModule} from './bs-component/bsComponent.module';
import {BSElementModule} from './bs-element/bsElement.module';

import {DashboardComponent} from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {MainViewModule} from './main-view/main-view.module';
import {LogoutModule} from './logout/logout.module';
import {UserSettingsModule} from './user-settings/userSettings.module';
import {ServicesModule} from './services/services.module';
import {ManageViewsModule} from './manage-views/manage-views.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    ModalModule,
    HomeModule,
    ChartModule,
    TableModule,
    FormModule,
    GridModule,
    BSComponentModule,
    BSElementModule,
    BlankPageModule,
    MainViewModule,
    LogoutModule,
    UserSettingsModule,
    ServicesModule,
    ManageViewsModule
  ],
  declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
  exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule {
}
