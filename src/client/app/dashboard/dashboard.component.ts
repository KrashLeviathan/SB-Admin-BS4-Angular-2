import {Component} from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {NgZone, Renderer, ElementRef, ViewChild} from '@angular/core';
import {GlobalVariables} from '../shared/global-variables';

/**
 *  This class represents the lazy loaded DashboardComponent.
 */

@Component({
  moduleId: module.id,
  selector: 'dashboard-cmp',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  @ViewChild('spinnerElement') spinnerElement: ElementRef;
  spinnerSubscription: any;
  spinnerTimeout: any;
  currentUrl: string;

  constructor(private router: Router,
              private ngZone: NgZone,
              private renderer: Renderer) {

    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });

    this.initSpinnerSubscription();
  }

  private initSpinnerSubscription(): void {
    this.spinnerSubscription = GlobalVariables.navigationState.subscribe(
      value => {
        this.ngZone.runOutsideAngular(() => {
          // For simplicity we are going to turn opacity on / off
          // you could add/remove a class for more advanced styling
          // and enter/leave animation of the spinner
          this.renderer.setElementStyle(
            this.spinnerElement.nativeElement,
            'opacity',
            (value) ? '1' : '0'
          );
          if (this.spinnerTimeout) {
            clearTimeout(this.spinnerTimeout);
            this.spinnerTimeout = null;
          }
        });
      },
      error => {
        console.log('spinnerSubscription Error');
      },
      () => {
        console.log('spinnerSubscription Finished');
      }
    );
  }

  // Shows and hides the loading spinner during RouterEvent changes
  private _navigationInterceptor(event: RouterEvent): void {
    // Turn on navigationState when navigation starts. It's up to the loaded
    // component to turn navigation off, otherwise it will turn off after
    // timeout (see below)
    if (event instanceof NavigationStart) {
      GlobalVariables.navigationState.next(true);
    }

    // Make sure it doesn't get stuck on (in case some component doesn't shut it off)
    if (event instanceof NavigationEnd) {
      this.onNavEnd(event);
    }

    // Set loading state to false in both of the below events to
    // hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      GlobalVariables.navigationState.next(false);
    }
    if (event instanceof NavigationError) {
      GlobalVariables.navigationState.next(false);
    }
  }

  private onNavEnd(event: NavigationEnd): void {
    // If they clicked the same url they're currently at, don't show spinner
    if (this.currentUrl === event.url) {
      GlobalVariables.navigationState.next(false);
      return;
    }
    // Otherwise...
    this.currentUrl = event.url;
    if (this.spinnerTimeout) {
      clearTimeout(this.spinnerTimeout);
    }
    this.spinnerTimeout = setTimeout(() => {
      GlobalVariables.navigationState.next(false);
      this.spinnerTimeout = null;
    }, 5000);
  }
}
