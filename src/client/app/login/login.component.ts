import {Component, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleService} from '../shared/google/google.service';


/**
 *  This class represents the lazy loaded LoginComponent.
 */
declare const gapi: any;

@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements AfterViewInit {
  constructor(private router: Router, private google: GoogleService) {
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
    this.google.loginUser(googleUser)
      .then(() => this.router.navigate(['/dashboard', 'home']));
  }
}

