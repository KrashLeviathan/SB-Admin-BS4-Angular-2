import {Component, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleService} from '../shared/google/google.service';

declare const gapi: any;

@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements AfterViewInit {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private google: GoogleService) {
  }

  ngAfterViewInit() {
    let createNewUser = (this.route.data as any).value.addNewUser === true;
    gapi.signin2.render('googleBtn', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': (param: any) => this.onSignIn(param, createNewUser)
    });
  }

  public onSignIn(googleUser: any, createNewUser: boolean) {
    //This function sends the http request to the database.
    this.google.loginUser(googleUser, createNewUser)
      .then((success) => {
        if (success) {
          this.router.navigate(['/dashboard', 'home']);
          localStorage.setItem('isRefreshed', "false");
        } else {
          this.router.navigate(['/signup']);
        }
      });
  }
}

