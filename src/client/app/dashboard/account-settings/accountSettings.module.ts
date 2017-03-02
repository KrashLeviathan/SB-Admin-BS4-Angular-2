import {NgModule} from '@angular/core';

import {AccountSettingsComponent} from './accountSettings.component';
import {CommonModule} from '@angular/common';
import {AccountService} from '../account.service';

@NgModule({
  imports: [CommonModule],
  declarations: [AccountSettingsComponent],
  exports: [AccountSettingsComponent],
  providers: [AccountService]
})

export class AccountSettingsModule {
}
