import {Route} from '@angular/router';

import {HomeRoutes} from './home/index';
import {MainViewRoutes} from './main-view/main-view.routes';
import {LogoutRoutes} from './logout/logout.routes';
import {UserSettingsRoutes} from './user-settings/userSettings.routes';
import {AccountSettingsRoutes} from './account-settings/accountSettings.routes';
import {ServicesRoutes} from './services/services.routes';
import {ManageViewsRoutes} from './manage-views/manage-views.routes';
import {ManageUsersRoutes} from './manage-users/manage-users.routes';

import {DashboardComponent} from './index';
import {ServiceDetailRoutes} from './service/service-detail.routes';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ...MainViewRoutes,
      ...HomeRoutes,
      ...LogoutRoutes,
      ...UserSettingsRoutes,
      ...AccountSettingsRoutes,
      ...ServiceDetailRoutes,
      ...ServicesRoutes,
      ...ManageViewsRoutes,
      ...ManageUsersRoutes
    ]
  }
];
