import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {SignupComponent} from './signup.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [SignupComponent],
  exports: [SignupComponent]
})

export class SignupModule {
}
