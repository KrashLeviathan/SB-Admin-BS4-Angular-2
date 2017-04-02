import {Injectable} from '@angular/core';
import {Household} from './household';
import {HOUSEHOLDS} from './mock-households';
import {Http, RequestOptions, Headers} from "@angular/http";
import {UserService} from "../user/user.service";

@Injectable()
export class HouseholdService {
  static activeHousehold: Household;
  constructor (
    private http: Http
  ) {}

  getHousehold(householdId: number): Promise<Household> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/households/`+householdId).toPromise().then(response => {
        let house = new Household();
        let body = response.json();
        house.householdId = body.householdId;
        house.householdName = body.householdName;
        house.ownerId = body.ownerId;
        house.firstAddressLine = body.firstAddressLine;
        house.secondAddressLine = body.secondAddressLine;
        house.city = body.city;
        house.state = body.state;
        house.zipCode = body.zipCode;
        house.lastUpdated = body.lastUpdated;
        house.created = body.created;
        HouseholdService.activeHousehold = house;
        resolve(house);
      })
    });
  }

  saveHousehold(formData: Object): Promise<boolean> {

    return new Promise(resolve => {
      let house = new Household();
      house.householdId = UserService.activeUser.householdId;
      house.householdName = formData['householdName'];
      house.ownerId = HouseholdService.activeHousehold.ownerId;
      house.city = formData['city'];
      house.zipCode = formData['zipCode'];
      house.state = formData['state'];
      house.firstAddressLine = formData['firstAddressLine'];

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});

      this.http.put(`http://localhost:8000/households`, JSON.stringify(house), options).toPromise().then(
        response => {
          resolve(true);
        }
      );
    });
  }
}
