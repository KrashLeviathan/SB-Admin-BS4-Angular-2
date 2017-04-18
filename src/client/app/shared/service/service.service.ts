import {Injectable} from '@angular/core';
import {ALL_SERVICE_TYPES, Service, ServiceType} from './service';
import {SERVICES} from './mock-services';
import {Http} from '@angular/http';
import {GlobalVariables} from "../global-variables";
import {HouseholdService} from "../household/household.service";
import {LightComponent} from "./library/light.component";
import {Glob} from "micromatch";
import {UserService} from "../user/user.service";

@Injectable()
export class ServiceService {
  // TODO: Remove this counter once the server-side solution is in place.
  // The server should be the one generating serviceId's
  static idCounter: number = 10;

  constructor(private http: Http, private userService: UserService) {
  }

  /**
   * Sends a request to the server to get a specific service for the account.
   * @param serviceId
   * @returns {Promise<Service>}
   */
  getService(userId: number, serviceId: number): Promise<Service> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/services/` + serviceId).toPromise().then(response => {
        let json = response.json();
          this.http.get(GlobalVariables.BASE_URL + `/services/` + serviceId + `/types/`).toPromise()
            .then(response => {
              let curr = response.json();
              let data = {
                serviceId: serviceId,
                name: json.name,
                description: json.description,
                serviceType: ALL_SERVICE_TYPES[curr.serviceTypeId -1],
                component: ALL_SERVICE_TYPES[curr.serviceTypeId -1].component,
                status: curr.isActive,
                wide: false,
                tall: false,
                data: {turnedOn: false}
              };
              resolve(data);
            });

      });
    });
  }

  /**
   * Sends a request to the server to get all services for the account.
   * Returns an array of Service objects.
   * @returns {Promise<Service[]>}
   */
  getServicesInHousehold(): Promise<Service[]> {

    // TODO: Fix after demo
    return new Promise(resolve => {
      let services: Service[] = [];
      this.http.get(GlobalVariables.BASE_URL + `/households/`+ HouseholdService.activeHousehold.householdId
    +`/services`).toPromise().then(response => {

        let json = response.json();
        let promisesArray:Array<any> = [];
        if(json.length > 0){
          //TODO instead of returning these services, will need to do http requests to each service.
          for(let i = 0; i< json.length; i++){
            promisesArray.push(this.http.get(GlobalVariables.BASE_URL + `/services/` + json[i].serviceId + `/types/`).toPromise());
          }

          Promise.all(promisesArray).then(response => {
            for(let i = 0; i<response.length; i++){
              let curr = response[i].json();
              let data = {
                serviceId: json[i].serviceId,
                name: json[i].name,
                description: json[i].description,
                serviceType: ALL_SERVICE_TYPES[curr.serviceTypeId -1],
                component: ALL_SERVICE_TYPES[curr.serviceTypeId -1].component,
                status: curr.isActive,
                wide: false,
                tall: false,
                data: {turnedOn: false}
              };
              services.push(data);
            }
            console.log(services);
            resolve(services);
          });
        }else{
          console.log("Get services in Household: no services");
          resolve(services);
        }
      });
    });
  }

  /**
   * Sends a request to the server to get all services
   * Returns an array of Service objects.
   * @returns {Promise<Service[]>}
   */
  getServices(): Promise<Service[]> {

    // TODO: Fix after demo
    return new Promise(resolve => {
      let services: Service[] = [];
      this.http.get(GlobalVariables.BASE_URL + `/services/`).toPromise().then(response => {

        let json = response.json();
        let promisesArray:Array<any> = [];
        if(json.length > 0){
          for(let i = 0; i< json.length; i++){
            promisesArray.push(this.http.get(GlobalVariables.BASE_URL + `/services/` + json[i].serviceId + `/types/`).toPromise());
          }

          Promise.all(promisesArray).then(response => {
            for(let i = 0; i<response.length; i++){
              let curr = response[i].json();
              let data = {
                serviceId: json[i].serviceId,
                name: json[i].name,
                description: json[i].description,
                serviceType: ALL_SERVICE_TYPES[curr.serviceTypeId-1],
                component: ALL_SERVICE_TYPES[curr.serviceTypeId-1].component,
                status: curr.isActive,
                wide: false,
                tall: false,
                data: {turnedOn: false}
              };
              services.push(data);
            }
            console.log(services);
            resolve(services);
          });
        }else{
          console.log("Get services: No services");
          resolve(services);
        }

      });
    });
  }

  addServiceToHousehold(serviceId: number): Promise<Service[]>{
    return new Promise(resolve => {
      let body = {
        householdId: HouseholdService.activeHousehold.householdId,
        serviceId: serviceId
      }
      this.http.post(GlobalVariables.BASE_URL + `/households/services`, JSON.stringify(body), UserService.jsonHeader()).toPromise()
        .then(response => {
          this.getServicesInHousehold().then(services => {
            resolve(services);
          })
        })
    })
  }

  /**
   * Sends a request to the server to create a new service of type serviceType.
   * The server should respond with the serviceId, which then resolves the Promise.
   * Returns a -1 if there was an error and the server could not create the service.
   * @param serviceType
   * @returns {Promise<number>}
   */
  createNewService(serviceType: ServiceType): Promise<number> {
    return new Promise(resolve => {
      let body = {
        "name": "My New Service",
        "serviceTypeId": serviceType.serviceTypeId,
        "description": "Description",
        "isActive": 1,
        "wide": 0,
        "tall": 0
      }
      this.http.post(GlobalVariables.BASE_URL + `/services/`, JSON.stringify(body), UserService.jsonHeader()).toPromise()
        .then(response => {
          let service = response.json();
          this.addServiceToHousehold(service.serviceId).then(() => {
            resolve(service.serviceId);
          })
        })
    });
  }

  removeServiceFromHousehold(householdId: number, serviceId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.http.delete(GlobalVariables.BASE_URL + `/households/` + householdId + `/services/` + serviceId, UserService.jsonHeader()).toPromise()
        .then(response => {
          resolve(true);
        }).catch(() => {
        resolve(false);
      })
    })
  }

  deleteService(serviceId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.http.delete(GlobalVariables.BASE_URL + `/services/` + serviceId, UserService.jsonHeader()).toPromise()
        .then(response => {
          resolve(true);
        }).catch(() => {
        resolve(false);
      })
    });
  }
}
