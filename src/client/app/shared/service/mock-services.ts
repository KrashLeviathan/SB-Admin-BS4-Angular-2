import {Service, ALL_SERVICE_TYPES} from './service';
import {LightComponent} from './library/light.component';
import {TodoListComponent} from './library/todo-list.component';
import {WundergroundComponent} from './library/wunderground.component';

export const SERVICES: Service[] = [
  {
    serviceId: 1,
    name: 'OttoLights',
    description: 'The lights in Otto\'s bedroom',
    serviceType: ALL_SERVICE_TYPES[0],
    component: LightComponent,
    status: 'up',
    wide: false,
    tall: false,
    data: {turnedOn: false}
  },
  {
    serviceId: 2,
    name: 'ThornstonLights',
    description: 'The lights in Thornston\'s room',
    serviceType: ALL_SERVICE_TYPES[0],
    component: LightComponent,
    status: 'up',
    wide: false,
    tall: false,
    data: {turnedOn: true}
  },
  {
    serviceId: 3,
    name: 'Wunderground',
    description: 'The Weather Underground service',
    serviceType: ALL_SERVICE_TYPES[1],
    component: WundergroundComponent,
    status: 'down',
    wide: false,
    tall: false,
    data: {
      location: 'Ames, IA',
      temp: 42,
      celsius: false
    }
  },
  {
    serviceId: 4,
    name: 'OttoTodo',
    description: 'Otto\'s TODO List',
    serviceType: ALL_SERVICE_TYPES[2],
    component: TodoListComponent,
    status: 'unknown',
    wide: true,
    tall: true,
    data: {
      items: [
        {description: 'Laundry', complete: false},
        {description: 'Dishes', complete: true},
        {description: 'Repairs', complete: false}
      ]
    }
  }
];
