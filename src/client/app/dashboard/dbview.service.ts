import {Injectable} from '@angular/core';
import {DBView} from './dbview';
import {DB_VIEWS} from './mock-dbviews';

@Injectable()
export class DBViewService {
  getView(id: number) {
    return this.getViews()
      .then(views => views.find(view => view.viewId === id));
  }

  getViews(): Promise<DBView[]> {
    return Promise.resolve(DB_VIEWS);
  }

  getActiveViewId(): Promise<number> {
    return Promise.resolve(2);
  }
}
