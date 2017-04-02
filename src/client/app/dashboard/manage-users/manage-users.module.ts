import {NgModule} from '@angular/core';
import {ManageUsersComponent} from './manage-users.component';
import {CommonModule} from '@angular/common';
import {UserService} from '../../shared/user/user.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ManageUsersComponent],
  exports: [ManageUsersComponent],
  providers: [UserService]
})

export class ManageUsersModule {
}
