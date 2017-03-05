import {NgModule} from '@angular/core';

import {AccountSettingsComponent} from './accountSettings.component';
import {CommonModule} from '@angular/common';
import {AccountService} from '../shared/account/account.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AccountSettingsComponent],
  exports: [AccountSettingsComponent],
  providers: [AccountService]
})

export class AccountSettingsModule {
}
