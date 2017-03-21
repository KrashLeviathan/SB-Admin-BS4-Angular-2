import {Service, ALL_SERVICE_TYPES} from './service';

export const SERVICES: Service[] = [
  {
    serviceId: 1,
    name: 'OttoLights',
    description: 'The lights in Otto\'s bedroom',
    serviceType: ALL_SERVICE_TYPES[0],
    status: 'up',
    wide: true,
    tall: true
  },
  {
    serviceId: 2,
    name: 'ThornstonLights',
    description: 'The lights in Thornston\'s room',
    serviceType: ALL_SERVICE_TYPES[0],
    status: 'up',
    wide: true,
    tall: false
  },
  {
    serviceId: 3,
    name: 'Wunderground',
    description: 'The Weather Underground service',
    serviceType: ALL_SERVICE_TYPES[1],
    status: 'down',
    wide: false,
    tall: true
  },
  {
    serviceId: 4,
    name: 'OttoGmail',
    description: 'Otto\'s Gmail calendar',
    serviceType: ALL_SERVICE_TYPES[2],
    status: 'unknown',
    wide: false,
    tall: false
  }
];
