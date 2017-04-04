import {Injectable} from '@angular/core';
import {Service, ServiceType} from './service';
import {SERVICES} from './mock-services';
import {Http} from '@angular/http';

@Injectable()
export class ServiceService {
  // TODO: Remove this counter once the server-side solution is in place.
  // The server should be the one generating serviceId's
  static idCounter: number = 10;

  constructor(private http: Http) {
  }

  /**
   * Sends a request to the server to get a specific service for the account.
   * @param serviceId
   * @returns {Promise<Service>}
   */
  getService(userId: number, serviceId: number): Promise<Service> {
    return new Promise(resolve => {
      // TODO: Replace with HTTP request

      if (!Number.isNaN(serviceId) && serviceId >= 1 && serviceId <= 4) {
        // Simulate latency
        setTimeout(() => {
          resolve(SERVICES[serviceId - 1]);
        }, 250);
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Sends a request to the server to get all services for the account.
   * Returns an array of Service objects.
   * @returns {Promise<Service[]>}
   */
  getServices(): Promise<Service[]> {
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(SERVICES);
      }, 250);
    });

    // TODO: Fix after demo
    // return new Promise(resolve => {
    //   this.http.get(GlobalVariables.BASE_URL + `/households/`+ HouseholdService.activeHousehold.householdId
    // +`/services`).toPromise().then(response => {
    //     let json = response.json();
    //     let services: Service[] = [];
    //     //TODO instead of returning these services, will need to do http requests to each service.
    //     for(let i = 0; i< json.length; i++){
    //       let service = new Service(LightComponent, json[0]);
    //       services.push(service);
    //     }
    //     resolve(services);
    //   });
    // });
  }

  /**
   * Sends a request to the server to create a new service of type serviceType.
   * The server should respond with the serviceId, which then resolves the Promise.
   * Returns a -1 if there was an error and the server could not create the service.
   * @param serviceType
   * @returns {Promise<number>}
   */
  createNewService(userId: number, serviceType: ServiceType): Promise<number> {
    // TODO: Replace with HTTP request
    console.log('ServiceService.createNewService(' + serviceType.name + ') --> ' + ServiceService.idCounter);
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(ServiceService.idCounter++);
      }, 250);
    });
  }

  deleteService(userId: number, serviceId: number): Promise<boolean> {
    // TODO: Replace with HTTP request
    console.log('ServiceService.deleteService(' + serviceId + ') --> success');
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 250);
    });
  }
}
