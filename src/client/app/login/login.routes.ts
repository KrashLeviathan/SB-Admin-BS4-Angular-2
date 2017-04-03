import {Route} from '@angular/router';
import {LoginComponent} from './index';

export const LoginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    data: {createNewUser: false}
  },
  {
    path: 'createnewuser',
    component: LoginComponent,
    data: {createNewUser: true}
  }
];
