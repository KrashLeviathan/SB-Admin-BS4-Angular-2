import {Route} from '@angular/router';

import {MainViewComponent} from './index';
import {MainViewAddServiceComponent} from './main-view-add-service.component';

export const MainViewRoutes: Route[] = [
  {
    path: 'home',
    component: MainViewComponent
  },
  {
    path: 'home/edit',
    component: MainViewComponent,
    data: {editModeActive: true}
  },
  {
    path: 'home/addservice',
    component: MainViewAddServiceComponent
  }
];
