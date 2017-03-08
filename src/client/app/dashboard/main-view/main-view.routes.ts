import {Route} from '@angular/router';

import {MainViewComponent} from './index';

export const MainViewRoutes: Route[] = [
  {
    path: 'home',
    component: MainViewComponent
  },
  {
    path: 'home/edit',
    component: MainViewComponent,
    data: {editModeActive: true}
  }
];
