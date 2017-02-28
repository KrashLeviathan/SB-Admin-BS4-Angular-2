import {Route} from '@angular/router';

import {HomeRoutes} from './home/index';
import {ChartRoutes} from './charts/index';
import {BlankPageRoutes} from './blank-page/index';
import {TableRoutes} from './tables/index';
import {FormRoutes} from './forms/index';
import {GridRoutes} from './grid/index';
import {BSComponentRoutes} from './bs-component/index';
import {BSElementRoutes} from './bs-element/index';
import {MainViewRoutes} from './main-view/main-view.routes';
import {LogoutRoutes} from './logout/logout.routes';
import {UserSettingsRoutes} from './user-settings/userSettings.routes';

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
      ...TableRoutes,
      ...BlankPageRoutes,
      ...FormRoutes,
      ...GridRoutes,
      ...BSElementRoutes,
      ...LogoutRoutes,
      ...UserSettingsRoutes
    ]
  }
];
