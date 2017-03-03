import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountService} from '../account.service';
import {Account} from '../account';
import {STATES, State} from '../../states';

@Component({
  moduleId: module.id,
  selector: 'account-settings',
  templateUrl: './accountSettings.component.html'
})

export class AccountSettingsComponent implements OnInit {
  MAX_NAME_LENGTH: number = Account.MAX_NAME_LENGTH;
  MAX_ADDRESS_LENGTH: number = Account.MAX_ADDRESS_LENGTH;
  MAX_CITY_LENGTH: number = Account.MAX_CITY_LENGTH;

  activeAccount: Account = {
    accountId: 0,
    accountName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: 0
  };

  states: State[];
  formDisabled: boolean = true;
  savingState: boolean = false;

  constructor(private accountService: AccountService) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.getActiveAccount()
      .then(account => this.activeAccount = account);
  }

  getActiveAccount(): Promise<Account> {
    return this.accountService.getAccount(0);
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      // TODO: Form is invalid! Do something here.
      console.log('Invalid form data!');
      return;
    }
    this.formDisabled = true;
    this.savingState = true;
    this.accountService.saveAccount(form.value)
      .then(success => {
        this.savingState = false;
        if (success) {
          this.activeAccount.accountName = form.value.accountName;
          this.activeAccount.streetAddress = form.value.streetAddress;
          this.activeAccount.city = form.value.city;
          this.activeAccount.state = form.value.state;
          this.activeAccount.zip = form.value.zip;
        } else {
          // TODO: Display error message if the form failed to save on the server
          this.formDisabled = false;
        }
      });
  }

  cancelChanges(form: NgForm): void {
    this.formDisabled = true;
    form.resetForm({
      accountName: this.activeAccount.accountName,
      streetAddress: this.activeAccount.streetAddress,
      city: this.activeAccount.city,
      state: this.activeAccount.state,
      zip: this.activeAccount.zip
    });
  }
}
