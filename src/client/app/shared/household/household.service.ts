import {Injectable} from '@angular/core';
import {Household} from './household';
import {HOUSEHOLDS} from './mock-households';
import {Http} from "@angular/http";
import {UserService} from "../user/user.service";

@Injectable()
export class HouseholdService {
  constructor (
    private http: Http,
  ) {}
  getHousehold(householdId: number): Promise<Household> {
    return new Promise(resolve =>{
      this.http.get(`http://localhost:8000/households/` + UserService.activeUser.householdId).toPromise().then(
        response => {
          let house = response.json();
          resolve(house);
        }
      )
    });
  }

  saveHousehold(formData: Object): Promise<boolean> {
    // TODO: Save form data to server
    console.log(formData);
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(true), 1000);
    });
  }
}
