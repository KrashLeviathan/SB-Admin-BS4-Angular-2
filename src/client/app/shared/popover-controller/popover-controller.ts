import {Component, OnInit} from '@angular/core';

/**
 * DANGER - Color of the alert is red
 * SUCCESS - Color of the alert is green
 */
export enum AlertType {
  DANGER, SUCCESS
}

@Component({
  moduleId: module.id,
  selector: 'popover-controller',
  templateUrl: 'popover-controller.html',
  styleUrls: ['./popover-controller.css']
})

/**
 * Provides an easy-to-use API for displaying messages at the top of the app.
 */
export class PopoverControllerComponent implements OnInit {
  static alerts: any[] = [];

  /**
   * Use this static method to display an alert at the top of the app.
   * @param alertType - Determines the color of the alert
   * @param message - Determines the message in the alert
   * @param timeout - Milliseconds before the message disappears. Default is 5000 ms.
   */
  static createAlert(alertType: AlertType, message: string, timeout: number = 5000): void {
    switch (alertType) {
      case AlertType.DANGER:
        var typeText = 'danger';
        break;
      case AlertType.SUCCESS:
        typeText = 'success';
        break;
      default:
        typeText = '';
    }

    // Add alert to static alerts array
    let alert = {
      type: typeText,
      msg: message,
      closable: true,
      timeout: timeout,
      fadedIn: false
    };
    this.alerts.unshift(alert);

    // Fade in
    setTimeout(() => {
      if (this.alerts.length > 0) {
        this.alerts[0].fadedIn = true;
      }
    }, 5);
  }

  /**
   * Allow the user to programmatically close an alert.
   * @param i
   */
  static closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  ngOnInit(): void {
    // TODO: Get any messages from server?
  }

  get staticAlertsArray() {
    return PopoverControllerComponent.alerts;
  }

  closeStaticAlert(i: number): void {
    PopoverControllerComponent.closeAlert(i);
  }

}
