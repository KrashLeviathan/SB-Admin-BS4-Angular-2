import {Injectable} from '@angular/core';
import {Household} from './household';
import {HOUSEHOLDS} from './mock-households';
import {Http} from "@angular/http";

@Injectable()
export class HouseholdService {
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
        resolve(house);
      })
    });
  }

  saveHousehold(formData: Object): Promise<boolean> {
    // TODO: Save form data to server
    console.log(formData);
    return new Promise(resolve => {
      let house = new Household();

      this.http.put(`http://localhost:8000/households`, JSON.stringify(house)).toPromise().then(
        response => {

        }
      );
    });
  }
}
