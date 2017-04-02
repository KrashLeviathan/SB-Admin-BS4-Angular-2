import {Injectable} from '@angular/core';
import {User} from "../user/user";
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";


@Injectable()
export class GoogleService {
  private myUser: User;
  constructor (
    private userService: UserService,
    private router: Router,
    private http: Http
  ) {}


  loginUser(googleUser: any) : Promise<User>{
    console.log("Logging in user");
    let profile = googleUser.getBasicProfile();
    this.myUser = new User();
    this.myUser.googleId = profile.getId();
    this.myUser.givenName = profile.getGivenName();
    this.myUser.fullName = profile.getName();
    this.myUser.familyName = profile.getFamilyName();
    this.myUser.imageURL = profile.getImageUrl();
    this.myUser.email = profile.getEmail();
    this.myUser.role = '0';

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    /**
     *
     */
    return new Promise(resolve => {
      //TODO replace with actual email returned from google. Jack hasn't implemented that method yet.
      Promise.all([
        this.userService.getUserByGoogle(this.myUser.googleId),
        this.userService.getUserHouseholdByGoogle(this.myUser.googleId)
      ]).then(
        response => {
          this.acceptUser(response[0], response[1], googleUser);
          resolve();
        }
      ).catch(
        response => {
          this.addNewUser(response[0], options, googleUser);
          resolve();
        }
      );
    })
  }

  private acceptUser(response: Response, householdId: number, googleUser: any){
    this.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);
    let user = new User();
    let body = response.json();
    user.userId = body.userId;
    user.email = body.email;
    user.givenName = body.givenName;
    user.familyName = body.familyName;
    user.imageURL = body.imageURL;
    user.role = body.role;
    user.householdId = householdId;
    this.userService.setActiveUser(user);

  }

  private addNewUser(response: Response, options: RequestOptions, googleUser: any){
    let that = this;
    return this.userService.addNewUser(this.myUser, options)
      .then(
        response => {
          that.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);

          let user = new User();
          let body = response.json();
          user.userId = body.userId;
          user.email = body.email;
          user.givenName = body.givenName;
          user.familyName = body.familyName;
          user.imageURL = body.imageURL;
          user.role = body.role;
          this.userService.getUserHousehold(user.userId).then(householdId => {
            UserService.activeUser.householdId = householdId;
          });
          this.userService.setActiveUser(user);
        }
      )
      .catch(this.handleError)
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
