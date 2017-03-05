import {Route} from '@angular/router';

import {ServiceDetailComponent} from './index';

export const ServiceDetailRoutes: Route[] = [
  {
    path: 'service/:id',
    component: ServiceDetailComponent
  },
  {
    path: 'service/:id/edit',
    component: ServiceDetailComponent,
    data: {isEditing: true}
  }
];
