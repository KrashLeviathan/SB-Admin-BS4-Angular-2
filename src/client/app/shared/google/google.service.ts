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
    private router: Router
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
    //TODO replace with actual email
    let that = this;
    this.userService.getUserByEmail('11').then(
      response => {
        that.acceptUser(response, googleUser);
      }
    ).catch(
      response => {
        that.addNewUser(response, options, googleUser).catch(that.handleError);
      }
    );
  }

  private acceptUser(response: Response, googleUser: any){
    this.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);

    this.router.navigate(['/dashboard','home']);
  }

  private addNewUser(response: Response, options: RequestOptions, googleUser: any){
    let that = this;
    return this.userService.addNewUser(this.myUser, options)
      .then(
        response => {
          that.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);

          that.router.navigate(['/dashboard', 'home']);
        }
      )
      .catch(this.handleError)
  }

  private handleError (error: Response | any) {
    console.log(error);
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
