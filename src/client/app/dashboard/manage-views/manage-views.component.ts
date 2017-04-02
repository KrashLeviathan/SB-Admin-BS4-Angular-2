import {Component, OnInit} from '@angular/core';
import {DBView} from '../../shared/dbview/dbview';
import {DBViewService} from '../../shared/dbview/dbview.service';
import {PopoverControllerComponent, AlertType} from '../../shared/popover-controller/popover-controller';
import {UserService} from '../../shared/user/user.service';
import {GlobalVariables} from '../../shared/global-variables';

@Component({
  moduleId: module.id,
  selector: 'manage-views',
  templateUrl: './manage-views.component.html'
})

export class ManageViewsComponent implements OnInit {
  dbviews: DBView[];
  activeView: DBView;
  activeUserId: number;

  isConfirmingDelete: boolean = false;
  viewToDelete: any = {
    viewId: 0,
    name: ''
  };

  savingState: boolean = false;

  constructor(private dbViewService: DBViewService, private userService: UserService) {
  }

  // Gets activeUserId, then all views for the user, then the active view within that set of views
  ngOnInit(): void {
    this.userService.getActiveUser().then(user => {
      this.activeUserId = user.userId;
      this.getViews();
    });
  }

  getViews(): void {
    this.dbViewService.getViews(this.activeUserId)
      .then(views => {
        this.dbviews = views;
        this.getActiveView();
      });
  }

  getActiveView(): void {
    this.dbViewService.getActiveViewId(this.activeUserId)
      .then(viewId => {
        this.activeView = this.dbviews.find(view => view.viewId === viewId);
        this.navigationComplete();
      });
  }

  applyView(view: DBView): void {
    this.activeView = view;
  }

  deleteView(): void {
    if (!this.isConfirmingDelete) {
      return;
    }
    this.savingState = true;
    this.isConfirmingDelete = false;
    this.dbViewService.deleteView(this.viewToDelete.viewId)
      .then(success => {
        this.savingState = false;
        if (success) {
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, '\'' + this.viewToDelete.name + '\' view ' +
            'was successfully deleted.');
        } else {
          PopoverControllerComponent.createAlert(AlertType.DANGER,
            '\'' + this.viewToDelete.name + '\' could not be deleted.');
        }
        // Call cancelDelete to reset viewToDelete
        this.cancelDelete();
      });
  }

  confirmDelete(view: DBView): void {
    this.viewToDelete = view;
    this.isConfirmingDelete = true;
  }

  cancelDelete(): void {
    this.viewToDelete = {viewId: 0, name: ''};
    this.isConfirmingDelete = false;
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
