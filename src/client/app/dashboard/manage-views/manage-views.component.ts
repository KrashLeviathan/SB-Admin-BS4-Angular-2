import {Component, OnInit} from '@angular/core';
import {DBView} from '../../shared/dbview/dbview';
import {DBViewService} from '../../shared/dbview/dbview.service';
import {PopoverControllerComponent, AlertType} from "../../shared/popover-controller/popover-controller";

@Component({
  moduleId: module.id,
  selector: 'manage-views',
  templateUrl: './manage-views.component.html'
})

export class ManageViewsComponent implements OnInit {
  dbviews: DBView[];
  activeView: DBView;

  isConfirmingDelete: boolean = false;
  viewToDelete: any = {
    viewId: 0,
    name: ''
  };

  savingState: boolean = false;

  constructor(private dbViewService: DBViewService) {
  }

  ngOnInit(): void {
    this.getViews();
    this.getActiveView();
  }

  getViews(): void {
    this.dbViewService.getViews()
      .then(views => this.dbviews = views);
  }

  getActiveView(): void {
    this.dbViewService.getActiveViewId()
      .then(viewId => this.activeView = this.dbviews
        .find(view => view.viewId === viewId));
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
}
