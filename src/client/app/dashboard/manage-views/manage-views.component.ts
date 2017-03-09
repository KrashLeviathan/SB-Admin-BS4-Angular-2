import {Component, OnInit} from '@angular/core';
import {DBView} from '../../shared/dbview/dbview';
import {DBViewService} from '../../shared/dbview/dbview.service';

@Component({
  moduleId: module.id,
  selector: 'manage-views',
  templateUrl: './manage-views.component.html'
})

export class ManageViewsComponent implements OnInit {
  dbviews: DBView[];
  activeView: DBView;

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

  delete(viewId: number): void {
    console.log('TODO: delete(' + viewId + ')');
  }
}
