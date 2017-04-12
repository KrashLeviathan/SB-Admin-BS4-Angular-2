import {Injectable} from '@angular/core';
import {Household} from './household';
import {Http, RequestOptions, Headers} from '@angular/http';
import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {GlobalVariables} from '../global-variables';

@Injectable()
export class HouseholdService {
  static activeHousehold: Household;

  constructor(private http: Http) {
  }

  getActiveHousehold(): Promise<Household> {
    return new Promise(resolve => {
      if (HouseholdService.activeHousehold) {
        resolve(HouseholdService.activeHousehold);
      } else {
        this.getHousehold(UserService.activeUser.householdId).then(response => {
          resolve(response);
        });
      }
    });
  }

  getHousehold(householdId: number): Promise<Household> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/households/` + householdId).toPromise().then(response => {
        let body = response.json();
        let house = new Household(body);

        HouseholdService.activeHousehold = house;
        resolve(house);
      });
    });
  }

  getAllHouseholds(): Promise<Household[]> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/households`).toPromise().then(response => {
        let houses :Household[] = [];
        let list = response.json();
        for(let i = 0; i< list.length; i++){
          let currHouse = new Household(list[i]);
          houses.push(currHouse);
        }
        resolve(houses);
      })
    })
  }

  addHousehold(house: Household): Promise<Household>{

    return new Promise(resolve => {
      this.http.post(GlobalVariables.BASE_URL + `/households/`, JSON.stringify(house), UserService.jsonHeader()).toPromise()
        .then(response => {
          let data = response.json();
          let house = new Household(data);
          resolve(house);
      })
    })

  }

  saveHousehold(formData: any): Promise<boolean> {
    return new Promise(resolve => {
      let data = {
        "householdId": UserService.activeUser.householdId,
        "householdName": formData['householdName'],
        "ownerId": HouseholdService.activeHousehold.ownerId,
        "city": formData['city'],
        "zipCode": formData['zipCode'],
        "state": formData['state'],
        "firstAddressLine": formData['firstAddressLine'],
        "secondAddressLine": formData['secondAddressLine']
      };

      let house = new Household(data);

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});

      this.http.put(GlobalVariables.BASE_URL + `/households`, JSON.stringify(house), options).toPromise().then(
        response => {
          resolve(true);
        }
      );
    });
  }

  addUser(userId: number): Promise<User> {
    return new Promise(resolve => {
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let body = {'userId': userId, 'householdId': HouseholdService.activeHousehold.householdId};
      this.http.post(GlobalVariables.BASE_URL + `/households`, JSON.stringify(body), options);
    });
  }
}
