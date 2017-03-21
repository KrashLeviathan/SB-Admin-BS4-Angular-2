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
    let profile = googleUser.getBasicProfile();
    console.log('Token || ' + googleUser.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    //YOUR CODE HERE
    //TODO send the info to the server. Have the server add a new user if it doesn't exist yet.
    //TODO check the result of this function. Make sure that the response is ok.
    this.google.loginUser(googleUser);
    this.userService.setActiveUserSession(googleUser.getAuthResponse().id_token);

    this.router.navigate(['/dashboard','home']);
  }


}

