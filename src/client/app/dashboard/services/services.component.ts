import {Component, Injectable} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'services-cmp',
  templateUrl: './services.component.html'
})

@Injectable()
export class ServicesComponent {
  services: Service[] = [
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

  configure(service: Service) {
    console.log("TODO: configure(service)");
    console.log(service);
  }

  delete(service: Service) {
    console.log("TODO: delete(service)");
    console.log(service);
  }
}

class Service {
  serviceId: number;
  serviceName: string;
  description: string;
  serviceType: string;
  status: string;
}
