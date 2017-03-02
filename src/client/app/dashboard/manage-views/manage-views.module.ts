import {NgModule} from '@angular/core';

import {ManageViewsComponent} from './manage-views.component';
import {DBViewService} from '../dbview.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ManageViewsComponent],
  exports: [ManageViewsComponent],
  providers: [DBViewService]
})

export class ManageViewsModule {
}
