import {Injectable} from '@angular/core';
import {Json} from "@angular/common/src/facade/lang";
import {User} from "../user/user";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class GoogleService {
  private myUser: User;
  constructor (
    private http: Http
  ) {}

  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
  }

  private handleError (error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

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
    console.log("Sending http");
    console.log(JSON.stringify(this.myUser));
    return this.http.post(`http://localhost:8000/users/`, JSON.stringify(this.myUser), options)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

}
