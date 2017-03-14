import {Injectable} from '@angular/core';
import {DBView} from './dbview';
import {DB_VIEWS} from './mock-dbviews';

// TODO: Some of this stuff may get refactored into the UserService somehow.
@Injectable()
export class DBViewService {
  getView(viewId: number): Promise<DBView> {
    // TODO: Replace with request to server
    return new Promise(resolve => {
      let view = DB_VIEWS.find(view => view.viewId === viewId);
      resolve(view);
    });
  }

  getViews(): Promise<DBView[]> {
    // TODO: Replace with request to server
    return Promise.resolve(DB_VIEWS);
  }

  getActiveViewId(): Promise<number> {
    // TODO: Replace with request to server
    return Promise.resolve(2);
  }

  deleteView(viewId: number): Promise<boolean> {
    // TODO: Replace with request to server
    console.log('deleteView(' + viewId + ') --> success');
    return Promise.resolve(true);
  }
}
