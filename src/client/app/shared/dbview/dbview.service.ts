import {Injectable} from '@angular/core';
import {DBView} from './dbview';
import {DB_VIEWS} from './mock-dbviews';

// TODO: Some of this stuff may get refactored into the UserService somehow.
@Injectable()
export class DBViewService {
  getView(viewId: number): Promise<DBView> {
    // TODO: Replace with request to server
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        let view = DB_VIEWS.find(view => view.viewId === viewId);
        resolve(view);
      }, 250);
    });
  }

  getViews(userId: number): Promise<DBView[]> {
    // TODO: Replace with request to server
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(DB_VIEWS);
      }, 250);
    });
  }

  getActiveViewId(userId: number): Promise<number> {
    // TODO: Replace with request to server
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(2);
      }, 250);
    });
  }

  deleteView(viewId: number): Promise<boolean> {
    // TODO: Replace with request to server
    console.log('deleteView(' + viewId + ') --> success');
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 250);
    });
  }
}
