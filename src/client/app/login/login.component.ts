import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../shared/user/user.service";
import {GoogleService} from "../shared/google/google.service";

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
    console.log(this.google.loginUser(googleUser));

    //stores the token
    this.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);

    // this.router.navigate(['/dashboard','home']);
  }


}

