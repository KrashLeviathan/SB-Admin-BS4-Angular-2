import {Injectable} from '@angular/core';
import {User} from "../user/user";
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';
import {UserService} from "../user/user.service";

@Injectable()
export class GoogleService {
  private myUser: User;
  constructor (
    private userService: UserService
  ) {}



  loginUser(googleUser: any){
    let profile = googleUser.getBasicProfile();
    this.myUser = new User();
    this.myUser.googleId = profile.getId();
    this.myUser.givenName = profile.getGivenName();
    this.myUser.fullName = profile.getName();
    this.myUser.familyName = profile.getFamilyName();
    this.myUser.imageURL = profile.getImageUrl();
    this.myUser.email = profile.getEmail();
    this.myUser.role = '0';

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    /**
     *
     */
    //TODO try to get the user's info with the new endpoint jack will add first,
    this.userService.getUserByEmail(this.myUser.email, headers, options).then(
      currUser => this.extractData
    );
    //Then add a new user if unsuccessful.
    return ;
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
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
