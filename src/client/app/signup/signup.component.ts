import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

declare const gapi: any;

@Component({
  moduleId: module.id,
  selector: 'signup-cmp',
  templateUrl: 'signup.component.html',
  styles: [`
    .invite-list {
      width: 100%;
    }

    .rounded-btn.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .form-note {
      font-size: 0.7em;
      color: rgba(255, 255, 255, 0.5);
      font-style: italic;
      margin-top: 1em;
    }
  `]
})

export class SignupComponent {
  MAX_VARCHAR_LENGTH: number = 255;

  invites: string[] = ['XYZ Corporation', 'The Smiths', 'Google X'];

  // Form data
  displayName: string = '';
  householdName: string = '';
  acceptingInvite = false;
  selectedInvite: string = '';
  joinHouseholdLater: boolean = true;

  constructor(private router: Router) {
  }

  onSubmit(f: NgForm): void {
    // TODO: Use form values as route parameters to pass to the LoginComponent
    this.router.navigate(['/createnewuser']);
  }

  onClickInvite(invite: string): void {
    this.acceptingInvite = true;
    this.selectedInvite = invite;
    this.joinHouseholdLater = false;
    this.householdName = '';
  }

  onFocusHousehold(): void {
    this.selectedInvite = '';
    this.acceptingInvite = false;
    this.joinHouseholdLater = false;
  }

  onClickJoinLater(): void {
    this.joinHouseholdLater = true;
    this.selectedInvite = '';
    this.acceptingInvite = false;
    this.householdName = '';
  }
}

