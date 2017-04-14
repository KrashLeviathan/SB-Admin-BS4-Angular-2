import {Injectable} from '@angular/core';
import {ALL_SERVICE_TYPES, Service, ServiceType} from './service';
import {SERVICES} from './mock-services';
import {Http} from '@angular/http';
import {GlobalVariables} from "../global-variables";
import {HouseholdService} from "../household/household.service";
import {LightComponent} from "./library/light.component";
import {Glob} from "micromatch";

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

    // TODO: Fix after demo
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/households/`+ HouseholdService.activeHousehold.householdId
    +`/services`).toPromise().then(response => {

        let json = response.json();
        let services: Service[] = [];
        //TODO instead of returning these services, will need to do http requests to each service.
        for(let i = 0; i< json.length; i++){
          this.http.get(GlobalVariables.BASE_URL + `/services/` + json[i].serviceId + `/types/`).toPromise()
            .then(serviceType => {
              let type = serviceType.json();
              let data = {
                serviceId: json[i].serviceId,
                  name: json[i].name,
                description: json[i].description,
                serviceType: type.serviceTypeId,
                component: ALL_SERVICE_TYPES[type.serviceTypeId].component,
                status: json[i].status,
                wide: false,
                tall: false,
                data: {turnedOn: false}
              };
              let service = new Service(ALL_SERVICE_TYPES[type.serviceTypeId].component, data);
              services.push(service);
            });
        }
        console.log(services);
        resolve(services);
      });
    });
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
