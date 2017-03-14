import {Injectable} from '@angular/core';
import {Service, ServiceType} from './service';
import {SERVICES} from './mock-services';

@Injectable()
export class ServiceService {
  // TODO: Remove this counter once the server-side solution is in place.
  // The server should be the one generating serviceId's
  static idCounter: number = 10;

  /**
   * Sends a request to the server to get a specific service for the account.
   * @param serviceId
   * @returns {Promise<Service>}
   */
  getService(serviceId: number): Promise<Service> {
    // TODO: Replace with HTTP request
    if (!Number.isNaN(serviceId) && serviceId >= 1 && serviceId <= 4) {
      return Promise.resolve(SERVICES[serviceId - 1]);
    } else {
      return Promise.resolve(null);
    }
  }

  /**
   * Sends a request to the server to get all services for the account.
   * Returns an array of Service objects.
   * @returns {Promise<Service[]>}
   */
  getServices(): Promise<Service[]> {
    // TODO: Replace with HTTP request
    return Promise.resolve(SERVICES);
  }

  /**
   * Sends a request to the server to create a new service of type serviceType.
   * The server should respond with the serviceId, which then resolves the Promise.
   * Returns a -1 if there was an error and the server could not create the service.
   * @param serviceType
   * @returns {Promise<number>}
   */
  createNewService(serviceType: ServiceType): Promise<number> {
    // TODO: Replace with HTTP request
    console.log('ServiceService.createNewService(' + serviceType.name + ') --> ' + ServiceService.idCounter);
    return Promise.resolve(ServiceService.idCounter++);
  }

  deleteService(serviceId: number): Promise<boolean> {
    // TODO: Replace with HTTP request
    console.log('ServiceService.deleteService(' + serviceId + ') --> success');
    return Promise.resolve(true);
  }
}
