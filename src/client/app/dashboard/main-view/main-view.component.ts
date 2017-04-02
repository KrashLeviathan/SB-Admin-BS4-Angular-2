import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../../shared/service/service';
import {ServiceService} from '../../shared/service/service.service';
import {UserService} from '../../shared/user/user.service';
import {GlobalVariables} from '../../shared/global-variables';
import {AlertType, PopoverControllerComponent} from '../../shared/popover-controller/popover-controller';

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

export class MainViewComponent implements OnInit {
  packery: any;

  editModeActive: boolean = false;
  finishedInitializing: boolean = false;
  grid: HTMLDivElement;

  services: Service[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceService: ServiceService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.editModeActive = (this.route.data as any).value.editModeActive === true;
    this.userService.getActiveUser()
      .then(user => {
        this.serviceService.getServices(user.userId)
          .then(services => {
            this.services = services;
            this.grid = <HTMLDivElement>document.querySelector('#dashboard-grid');
            // Add a small delay so the services can populate the DOM with *ngFor before
            // initializing packery.
            new Promise(resolve => setTimeout(() => resolve(this.initPackery()), 1));
          });
      });
  }

  initPackery(): any {
    // TODO: Use userId -- Actually, the getting of services and user prefs could probably
    // be done together.
    this.userService.getUserPreferences(0)
      .then(initPositions => {
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
    // TODO
    console.log("Add Service clicked");
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
