import {Injectable} from '@angular/core';
// import {Json} from '@angular/common/src/facade/lang';
import {User} from '../user/user';
import {Headers, Http, RequestOptions} from '@angular/http';
// import {Response} from '@angular/http';
// import {Observable} from 'rxjs';

@Injectable()
export class GoogleService {
  private myUser: User;

  constructor(private http: Http) {
  }


  loginUser(googleUser: any) {
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

    return this.http.post(`http://localhost:8000/users/`, JSON.stringify(this.myUser), options);
  }

}
