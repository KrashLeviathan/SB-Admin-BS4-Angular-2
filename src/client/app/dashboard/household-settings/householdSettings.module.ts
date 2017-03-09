import {NgModule} from '@angular/core';

import {HouseholdSettingsComponent} from './householdSettings.component';
import {CommonModule} from '@angular/common';
import {HouseholdService} from '../../shared/household/household.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HouseholdSettingsComponent],
  exports: [HouseholdSettingsComponent],
  providers: [HouseholdService]
})

export class HouseholdSettingsModule {
}
