import {NgModule} from '@angular/core';

import {UserSettingsComponent} from './userSettings.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../../shared/user/user.service';
import {ColorPickerModule} from 'angular2-color-picker';

@NgModule({
  imports: [CommonModule, FormsModule, ColorPickerModule],
  declarations: [UserSettingsComponent],
  exports: [UserSettingsComponent],
  providers: [UserService]
})

export class UserSettingsModule {
}
