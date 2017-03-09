import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DAYS_UNTIL_SESSION_EXPIRATION} from "../dashboard/shared/user/user.service";
import {Router} from "@angular/router";

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
  //TODO include UserService and call that function
  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    gapi.signin2.render('googleBtn', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  public onSignIn(googleUser) {

    let profile = googleUser.getBasicProfile();
    console.log('Token || ' + googleUser.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    //YOUR CODE HERE
    //TODO send the info to the server. Have the server add a new user if it doesn't exist yet.
    //TODO figure out why it still tries to render the login button after redirecting.
    this.setActiveUserSession(googleUser.getAuthResponse().id_token);
    this.router.navigate(['dashboard','home']);

  }
  setActiveUserSession(sessionToken: string): void {
    // let encryptedToken = EncryptionService.encrypt(
    //   EncryptionService.encode(sessionToken)
    // );
    //TODO this is just a dummy function for now, replace with call to user.service.ts version.
    //TODO also use the encrypted version of the sessionToken.
    Cookie.set('sessionToken', sessionToken, DAYS_UNTIL_SESSION_EXPIRATION);
  }

}

