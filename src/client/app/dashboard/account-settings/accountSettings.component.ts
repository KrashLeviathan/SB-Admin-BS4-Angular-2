import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../account';
import {STATES, State} from '../../states';

@Component({
  moduleId: module.id,
  selector: 'account-settings',
  templateUrl: './accountSettings.component.html'
})

export class AccountSettingsComponent implements OnInit {
  activeAccount: Account = {
    accountId: 0,
    accountName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: 0
  };

  states: State[];

  constructor(private accountService: AccountService) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.getActiveAccount();
  }

  getActiveAccount(): void {
    this.accountService.getAccount(0)
      .then(account => {this.activeAccount = account});
  }
}
