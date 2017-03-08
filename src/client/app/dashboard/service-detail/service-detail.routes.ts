import {Route} from '@angular/router';

import {ServiceDetailComponent} from './index';
import {NewServiceComponent} from './new-service/new-service.component';

export const ServiceDetailRoutes: Route[] = [
  {
    path: 'service/new',
    pathMatch: 'full',
    component: NewServiceComponent
  },
  {
    path: 'service/:id',
    component: ServiceDetailComponent
  },
  {
    path: 'service/:id/edit',
    component: ServiceDetailComponent,
    data: {isEditing: true}
  },
  {
    path: 'service/**',
    redirectTo: 'services'
  }
];
