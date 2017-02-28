import {Route} from '@angular/router';

import {HomeRoutes} from './home/index';
import {ChartRoutes} from './charts/index';
import {BlankPageRoutes} from './blank-page/index';
import {GridRoutes} from './grid/index';
import {BSComponentRoutes} from './bs-component/index';
import {BSElementRoutes} from './bs-element/index';
import {MainViewRoutes} from './main-view/main-view.routes';
import {LogoutRoutes} from './logout/logout.routes';
import {UserSettingsRoutes} from './user-settings/userSettings.routes';
import {AccountSettingsRoutes} from './account-settings/accountSettings.routes';
import {ServicesRoutes} from './services/services.routes';
import {ManageViewsRoutes} from './manage-views/manage-views.routes';
import {ManageUsersRoutes} from './manage-users/manage-users.routes';

import {DashboardComponent} from './index';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ...MainViewRoutes,
      ...HomeRoutes,
      ...ChartRoutes,
      ...BSComponentRoutes,
      ...BlankPageRoutes,
      ...GridRoutes,
      ...BSElementRoutes,
      ...LogoutRoutes,
      ...UserSettingsRoutes,
      ...AccountSettingsRoutes,
      ...ServicesRoutes,
      ...ManageViewsRoutes,
      ...ManageUsersRoutes
    ]
  }
];
