import {Service} from './service';

export const SERVICES: Service[] = [
  {
    serviceId: 1,
    serviceName: 'OttoLights',
    description: 'The lights in Otto\'s bedroom',
    serviceType: 'IoT',
    status: 'up'
  },
  {
    serviceId: 2,
    serviceName: 'ThornstonLights',
    description: 'The lights in Thornston\'s room',
    serviceType: 'IoT',
    status: 'up'
  },
  {
    serviceId: 3,
    serviceName: 'Wunderground',
    description: 'The Weather Underground service',
    serviceType: 'Internet',
    status: 'down'
  },
  {
    serviceId: 4,
    serviceName: 'OttoGmail',
    description: 'Otto\'s Gmail account',
    serviceType: 'Account',
    status: 'unknown'
  }
];
