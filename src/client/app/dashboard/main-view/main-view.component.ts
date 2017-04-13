import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../../shared/service/service';
import {ServiceService} from '../../shared/service/service.service';
import {UserService} from '../../shared/user/user.service';
import {GlobalVariables} from '../../shared/global-variables';
import {AlertType, PopoverControllerComponent} from '../../shared/popover-controller/popover-controller';
import {HouseholdService} from '../../shared/household/household.service';

// Packery  -  http://packery.metafizzy.co/
declare let Packery: any;
const PACKERY_OPTIONS: any = {
  itemSelector: '.grid-item',
  columnWidth: 150,
  initLayout: false // disable initial layout
};
// Draggabilly  -  http://draggabilly.desandro.com/
declare let Draggabilly: any;

// Also got help from https://github.com/metafizzy/packery/issues/337 for persistent positioning
const DATA_ITEM_ATTRIBUTE: string = 'data-item-id';

@Component({
  moduleId: module.id,
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements AfterViewInit, OnInit {
  packery: any;

  editModeActive: boolean = false;
  finishedInitializing: boolean = false;
  grid: HTMLDivElement;
  userOwnsView: boolean = false;
  isAddingService: boolean = false;

  services: Service[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceService: ServiceService,
              private userService: UserService,
              private householdService: HouseholdService) {
  }

  ngOnInit() {
    this.editModeActive = (this.route.data as any).value.editModeActive === true;
    this.userService.getActiveUser()
      .then(user => {
        this.householdService.getActiveHousehold().then(response => {
          // TODO: Run check to see if user owns this DashboardView (user.userId == dbview.owner)
          this.userOwnsView = true; // FIXME
          this.serviceService.getServices()
            .then(services => {
              this.services = services;
              console.log(this.services);
              this.grid = <HTMLDivElement>document.querySelector('#dashboard-grid');
              setTimeout(() => this.initPackery(), 100);
            });
        });
      });
  }

  ngAfterViewInit() {
    // TODO
  }

  initPackery(): any {
    // TODO: Use userId -- Actually, the getting of services and user prefs could probably
    // be done together.
    this.userService.getUserDragPositions(UserService.activeUser.userId)
      .then(initPositions => {
        //TODO getUserPreferences will need to return colors and dragPositions.
        if (this.grid.children.length !== 0) {
          this.packery = new Packery(this.grid, PACKERY_OPTIONS);
          // init layout with saved positions
          this.packery.initShiftLayout(initPositions, DATA_ITEM_ATTRIBUTE);
          let thisObj = this;
          this.packery.getItemElements().forEach(function (itemElem: any) {
            let draggie = new Draggabilly(itemElem);
            thisObj.packery.bindDraggabillyEvents(draggie);
            if (!thisObj.editModeActive) {
              draggie.disable();
            }
            // The elements remain invisible until they're finished initializing.
            thisObj.finishedInitializing = true;
          });
          this.navigationComplete();
        }
      });
  }

  onSaveChangesClicked(): void {
    let positions = this.packery.getShiftPositions('data-item-id');
    // TODO: User userId
    this.userService.setUserPreferences(0, positions)
      .then(success => {
        if (success) {
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'Saved dashboard changes.');
          this.router.navigate(['dashboard/', 'home']);
        } else {
          PopoverControllerComponent.createAlert(AlertType.DANGER, 'Unable to save changes to the dashboard.');
        }
      });
  }

  onCancelChangesClicked(): void {
    this.router.navigate(['dashboard/', 'home']);
  }

  onAddServiceClicked(): void {
    if (!this.userOwnsView) {
      return;
    }
    this.isAddingService = true;
  }

  completeAddService(service: Service) {
    if (!this.isAddingService || !this.userOwnsView) {
      return;
    }
    this.isAddingService = false;
    // TODO: Add service to this dashboard view at any position
    console.log('Adding service to dashboard...');
    // if (success) {
    //   PopoverControllerComponent.createAlert(AlertType.SUCCESS, '\'' + this.serviceToDelete.name + '\' service ' +
    //     'was successfully deleted.');
    // } else {
    //   PopoverControllerComponent.createAlert(AlertType.DANGER,
    //     '\'' + this.serviceToDelete.name + '\' could not be deleted.');
    // }

    // We navigate to another component that navigates us back. That way
    // packery re-inits with the new service. A simple redirect doesn't work.
    this.router.navigate(['dashboard/', 'home', 'addservice']);
  }

  cancelAddService(): void {
    if (!this.userOwnsView) {
      return;
    }
    this.isAddingService = false;
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
