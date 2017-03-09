import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountService} from '../../shared/account/account.service';
import {Household} from '../../shared/account/household';
import {STATES, State} from '../../states';

@Component({
  moduleId: module.id,
  selector: 'account-settings',
  templateUrl: './accountSettings.component.html'
})

export class AccountSettingsComponent implements OnInit {
  MAX_VARCHAR_LENGTH: number = 255;

  activeHousehold: Household;

  states: State[];
  formDisabled: boolean = true;
  savingState: boolean = false;
  errorOnSave: boolean = false;

  constructor(private accountService: AccountService) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.getActiveAccount()
      .then(account => this.activeHousehold = account);
  }

  getActiveAccount(): Promise<Household> {
    return this.accountService.getAccount(0);
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorOnSave = true;
      return;
    }
    this.errorOnSave = false;
    this.formDisabled = true;
    this.savingState = true;
    this.accountService.saveAccount(form.value)
      .then(success => {
        this.savingState = false;
        if (success) {
          this.activeHousehold.accountName = form.value.accountName;
          this.activeHousehold.streetAddress = form.value.streetAddress;
          this.activeHousehold.city = form.value.city;
          this.activeHousehold.state = form.value.state;
          this.activeHousehold.zip = form.value.zip;
        } else {
          // TODO: Display error message if the form failed to save on the server
          this.errorOnSave = true;
          this.formDisabled = false;
        }
      });
  }

  cancelChanges(form: NgForm): void {
    this.errorOnSave = false;
    this.formDisabled = true;
    form.resetForm({
      accountName: this.activeHousehold.accountName,
      streetAddress: this.activeHousehold.streetAddress,
      city: this.activeHousehold.city,
      state: this.activeHousehold.state,
      zip: this.activeHousehold.zip
    });
  }
}
