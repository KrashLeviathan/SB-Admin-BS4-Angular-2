import {Route} from '@angular/router';

import {MainViewRoutes} from './main-view/main-view.routes';
import {UserSettingsRoutes} from './user-settings/userSettings.routes';
import {HouseholdSettingsRoutes} from './household-settings/householdSettings.routes';
import {ServicesRoutes} from './services/services.routes';
import {ManageViewsRoutes} from './manage-views/manage-views.routes';
import {ManageUsersRoutes} from './manage-users/manage-users.routes';

import {DashboardComponent} from './index';
import {ServiceDetailRoutes} from './service-detail/service-detail.routes';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      ...MainViewRoutes,
      ...UserSettingsRoutes,
      ...HouseholdSettingsRoutes,
      ...ServiceDetailRoutes,
      ...ServicesRoutes,
      ...ManageViewsRoutes,
      ...ManageUsersRoutes
    ]
  }
];
