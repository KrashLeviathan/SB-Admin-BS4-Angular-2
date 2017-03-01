import {Injectable} from '@angular/core';
import {Service} from './service';
import {SERVICES} from './mock-services';

@Injectable()
export class ServiceService {
  getService(id: number) {
    return this.getServices()
      .then(services => services.find(service => service.serviceId === id));
  }

  getServices(): Promise<Service[]> {
    return Promise.resolve(SERVICES);
  }
}
