import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/user/user.service";
import {GoogleService} from "../shared/google/google.service";
import {Observable} from "rxjs";
import {Response} from '@angular/http';


/**
 *  This class represents the lazy loaded LoginComponent.
 */
declare const gapi: any;

@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  constructor(private router: Router, private userService: UserService, private google: GoogleService) {
  }

  ngAfterViewInit() {
    gapi.signin2.render('googleBtn', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': (param: any) => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser: any) {
    //This function sends the http request to the database.
    this.google.loginUser(googleUser).toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);

    //stores the token
    this.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);

    this.router.navigate(['/dashboard','home']);
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

