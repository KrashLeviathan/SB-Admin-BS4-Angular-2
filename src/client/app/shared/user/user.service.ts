import {Injectable} from '@angular/core';
import {User} from './user';
import {EncryptionService} from '../encryption/encryption.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from "rxjs";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Router} from "@angular/router";
import {UserPreferences} from "./user-preferences";
import {ColorScheme} from "./color-scheme";
import {HouseholdService} from "../household/household.service";


export const DAYS_UNTIL_SESSION_EXPIRATION = 7;

@Injectable()
export class UserService {
  static activeUser: User;
  static activeUserPrefs: UserPreferences;

  constructor (
    private http: Http,
    private router: Router
  ) {}
  /**
   * On login, the active user sessionId is encrypted and stored in the cookies.
   * @param sessionToken
   */
  setActiveUserSession(sessionToken: string): void {
    let encryptedToken = EncryptionService.encrypt(
      EncryptionService.encode(sessionToken)
    );
    Cookie.set('sessionToken', encryptedToken, DAYS_UNTIL_SESSION_EXPIRATION);
    //TODO send sessionToken to the server to save.
  }

  setActiveUser(user: User){
    Cookie.set('userId', user.userId.toString());
    UserService.activeUser = user;
  }

  getActiveUser(): Promise<User> {
    let encryptedToken = Cookie.get('sessionToken');
    if (!encryptedToken) {
      // Expired token returns null active user
      return Promise.resolve(null);
    }
    // Decrypt session token
    let sessionToken = EncryptionService.decode(
      EncryptionService.decrypt(encryptedToken)
    );
    // Return the current active user if there's already one loaded,
    // otherwise load the active user, set it, and return it
    return new Promise(resolve => {
      if (UserService.activeUser) {
        resolve(UserService.activeUser);
      } else {
        this.getUser(parseInt(Cookie.get('userId'))).then(result => {
          resolve(result);
        })
      }
    });
  }

  getUser(userId: number): Promise<User> {
    return new Promise(resolve => {
      Promise.all([
        this.http.get(`http://localhost:8000/users/` + userId).toPromise(),
        this.getUserHousehold(userId),
        this.getUserPreferences(userId)
      ]).then(
          response => {

            let body = response[0].json();
            let user = new User();
            user.userId = body.userId;
            user.googleId = body.googleId;
            user.email = body.email;
            user.fullName = body.fullName;
            user.givenName = body.givenName;
            user.familyName = body.familyName;
            user.imageURL = body.imageURL;
            user.role = body.role;
            user.householdId = response[1];
            user.preferences = response[2];

            this.setActiveUser(user);
            if(user.role == "1"){
              user.isAdmin = true;
            }else{
              user.isAdmin = false;
            }
            resolve(user);
          }
        )
        .catch(this.handleError);
    });

  }

  getUserByGoogle(googleId: string): Promise<Response> {
    return this.http.get(`http://localhost:8000/users/google/`+ googleId).toPromise();
  }

  addNewUser(myUser: User, options: RequestOptions): Promise<Response> {
    return this.http.post('http://localhost:8000/users/', JSON.stringify(myUser), options).toPromise();
  }

  getUsers(householdId: number): Promise<User[]> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/households/` + householdId + `/users`).toPromise()
        .then(
          response => {
            let users = new Array<User>();
            let body = response.json();
            let count = 0;
            body.forEach((currIndex:any) => {
              let user = new User();
              user.userId = currIndex.userId;
              user.email = currIndex.email;
              user.givenName = currIndex.givenName;
              user.familyName = currIndex.familyName;
              user.imageURL = currIndex.imageURL;
              user.role = currIndex.role;
              user.displayName = currIndex.displayName;
              if(user.role == "1"){
                user.isAdmin = true;
              }else{
                user.isAdmin = false;
              }
              users[count] = user;
              count++;
            });
            resolve(users);
          }
        )
        .catch(this.handleError);
    });
  }

  getUserHousehold(userId: number): Promise<number> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/users/` + userId + `/household`).toPromise()
        .then(household => {
          let body = household.json();
          resolve(body.householdId);
      });
    });
  }

  getUserHouseholdByGoogle(googleId: string): Promise<number> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/users/google/` + googleId + `/household`).toPromise()
        .then(household => {
          let body = household.json();
          resolve(body.householdId);
        });
    });
  }

  getUserDragPositions(userId: number): Promise<UserPreferences>{
    //TODO: Currently just getting drag positions
    return new Promise(resolve => {
      resolve(localStorage.getItem('dragPositions'));
    })
  }

  getUserPreferences(userId: number): Promise<UserPreferences> {
    return new Promise(resolve => {
      Promise.all([
        this.getUserDragPositions(userId),
        this.http.get(`http://localhost:8000/users/` + userId + `/preferences`).toPromise()
      ]).then( response => {
        //TODO fix the way colorScheme is used.
        //Might need to create a new object to send as json as a hybrid of pref and color
          let pref = new UserPreferences();
          let color = new ColorScheme();
          let resp = response[1].json();
          pref.primaryColor = resp.primaryColor;
          pref.secondaryColor = resp.secondaryColor;
          pref.neutralDarkColor = resp.neutralDark;
          pref.neutralLightColor = resp.neutralLight;
          pref.accentColor = resp.accent;
          pref.id = resp.id;
          pref.name = resp.name;
          pref.userId = resp.userId;
          pref.colorScheme = color;
          UserService.activeUserPrefs = pref;
          resolve(response[0]);
        })

    });
  }

  setUserPreferences(userId: number, prefs: any): Promise<boolean> {
    // TODO: Replace with HTTP request
    localStorage.setItem('dragPositions', JSON.stringify(prefs));
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 250);
    });
  }

  saveUser(formData: Object): Promise<boolean> {

    //TODO some of the colors not sending correctly either.
    //TODO need to fix the way colorScheme is used.
    //Might need to create a new object to send as json as a hybrid of pref and color
    let user = UserService.activeUser;
    let pref = UserService.activeUserPrefs;
    let color = new ColorScheme();
    pref.accentColor = formData['accent'];
    pref.neutralLightColor = formData['neutralLight'];
    pref.neutralDarkColor = formData['neutralDark'];
    pref.primaryColor = formData['primary'];
    pref.secondaryColor = formData['secondary'];
    pref.colorScheme = color;
    user.preferences = pref;
    user.displayName = formData['displayName'];

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return new Promise(resolve => {
      Promise.all([
        this.http.put(`http://localhost:8000/users`, JSON.stringify(user), options).toPromise(),
        this.http.put(`http://localhost:8000/users/preferences`, JSON.stringify(pref), options).toPromise()
      ]).then(response =>{
            resolve(true);
          }
      );
    });

  }

  deleteUser(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.http.delete(`http://localhost:8000/users/` + userId).toPromise()
        .then(
          response => {
            let body = response.json();
            let user = new User();
            user.userId = body.userId;
            user.email = body.email;
            user.givenName = body.givenName;
            user.familyName = body.familyName;
            user.imageURL = body.imageURL;
            user.role = body.role;

            resolve(user);
          }
        )
        .catch(this.handleError);
    });
  }

  removeUserFromHousehold(userId: number): Promise<boolean> {

    return new Promise(resolve => {

      let body = {'userId': userId, 'householdId': HouseholdService.activeHousehold.householdId};
      this.http.delete(`http://localhost:8000/households/` + body.householdId + `/users/` +body.userId).toPromise()
        .then(
          response => {
            let body = response.json();
            let user = new User();
            user.userId = body.userId;
            user.email = body.email;
            user.givenName = body.givenName;
            user.familyName = body.familyName;
            user.imageURL = body.imageURL;
            user.role = body.role;

            resolve(user);
          }
        )
        .catch(this.handleError);
    });
  }
  giveAdminPrivileges(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/users/`+userId).toPromise().then(response => {
        let json = new User();
        let body = response.json();
        json.userId = userId;
        json.familyName = body.familyName;
        json.googleId = body.googleId;
        json.fullName = body.fullName;
        json.displayName = body.displayName;
        json.email = body.email;
        json.givenName = body.givenName;
        json.role = '1';
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        this.http.post(`http://localhost:8000/users/`, JSON.stringify(json), options).toPromise()
          .then(
            response => {
              let body = response.json();
              let user = new User();
              user.userId = body.userId;
              user.email = body.email;
              user.givenName = body.givenName;
              user.familyName = body.familyName;
              user.imageURL = body.imageURL;
              user.role = body.role;

              resolve(true);
            }
          )
          .catch(this.handleError);
      })
    });
  }

  revokeAdminPrivileges(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/users/`+userId).toPromise().then(response => {
        let json = new User();
        let body = response.json();
        json.userId = userId;
        json.familyName = body.familyName;
        json.googleId = body.googleId;
        json.fullName = body.fullName;
        json.displayName = body.displayName;
        json.email = body.email;
        json.givenName = body.givenName;
        json.role = '0';
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        this.http.post(`http://localhost:8000/users/`, JSON.stringify(json), options).toPromise()
          .then(
            response => {
              let body = response.json();
              let user = new User();
              user.userId = body.userId;
              user.email = body.email;
              user.givenName = body.givenName;
              user.familyName = body.familyName;
              user.imageURL = body.imageURL;
              user.role = body.role;

              resolve(true);
            }
          )
          .catch(this.handleError);
      })
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
