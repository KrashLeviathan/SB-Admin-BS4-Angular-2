import {Subject} from 'rxjs';

export class GlobalVariables {
  /**
   * When the user navigates by clicking on a link, an event is pushed to this Subject,
   * which tells the DashboardComponent to show the loading spinner. When the view
   * is finished being initialized, you need to push 'false' to the navigationState
   * using GlobalVariables.navigationState.next(false), which will tell the dashboard
   * to hide the spinner.
   * @type {Subject<boolean>}
   */
  static navigationState: Subject<boolean> = new Subject<boolean>();
}
