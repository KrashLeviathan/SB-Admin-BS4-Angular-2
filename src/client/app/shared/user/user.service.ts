import {Injectable} from '@angular/core';
import {User} from './user';
import {EncryptionService} from '../encryption/encryption.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Observable} from "rxjs";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Router} from "@angular/router";


export const DAYS_UNTIL_SESSION_EXPIRATION = 7;

@Injectable()
export class UserService {
  static activeUser: User;
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
        resolve(this.getUser(parseInt(Cookie.get('userId'))));
      }
    });
  }

  getUser(userId: number): Promise<User> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/users/` + userId).toPromise()
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
            this.setActiveUser(user);
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

  getUsers(): Promise<User[]> {
    return new Promise(resolve => {
      this.http.get(`http://localhost:8000/users/`).toPromise()
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
              users[count] = user;
              count++;
            });
            resolve(users);
          }
        )
        .catch(this.handleError);
    });
  }

  getUserPreferences(userId: number): Promise<any> {
    // TODO: Currently just getting drag positions
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(localStorage.getItem('dragPositions'));
      }, 1000);
    });
  }

  saveUser(formData: Object): Promise<boolean> {
    // TODO: Save form data to server
    console.log(formData);
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(true), 1000);
    });
  }

  setUserPreferences(userId: number, prefs: any): Promise<boolean> {
    // TODO: Replace with HTTP request
    localStorage.setItem('dragPositions', JSON.stringify(prefs));
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  deleteUser(userId: number): Promise<boolean> {
    console.log('deleteUser(' + userId + ') --> success');
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

  giveAdminPrivileges(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      let json = new User();
      json.userId = userId;
      json.role = '1';
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });

      this.http.post(`http://localhost:8000/users/createAdmin`, JSON.stringify(json), options).toPromise()
        .then(
          response => {
            let body = response.json();
            if(body.role == 1){
              resolve(true);
            }
            resolve(false);
          }
        )
        .catch(this.handleError);
    });
  }

  revokeAdminPrivileges(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      let json = new User();
      json.userId = userId;
      json.role = '1';
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });

      this.http.post(`http://localhost:8000/users/removeAdmin`, JSON.stringify(json), options).toPromise()
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
