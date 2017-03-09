import {NgModule} from '@angular/core';

import {HouseholdSettingsComponent} from './householdSettings.component';
import {CommonModule} from '@angular/common';
import {AccountService} from '../../shared/household/account.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HouseholdSettingsComponent],
  exports: [HouseholdSettingsComponent],
  providers: [AccountService]
})

export class HouseholdSettingsModule {
}
