import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../shared/service/service';
import {ServiceService} from '../shared/service/service.service';
import {UserService} from '../shared/user/user.service';

// <div *ngFor="let service of services"
//   [attr.data-item-id]="service.id"
// class="grid-item" [ngClass]="{
// 'is-editable': editModeActive,
//   'grid-item--width2': service.wide,
//   'grid-item--height2': service.tall
// }">FIX HTML</div>

// Packery  -  http://packery.metafizzy.co/
declare let Packery: any;
const PACKERY_OPTIONS: any = {
  itemSelector: '.grid-item',
  columnWidth: 150,
  initLayout: false // disable initial layout
};
// Draggabilly  -  http://draggabilly.desandro.com/
declare let Draggabilly: any;
const DRAGGABILLY_OPTIONS: any = {
  containment: '.grid'
};

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
  grid: HTMLDivElement;

  services: Service[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceService: ServiceService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.editModeActive = (this.route.data as any).value.editModeActive === true;
    this.serviceService.getServices()
      .then(services => {
        this.services = services;
        this.grid = <HTMLDivElement>document.querySelector('#dashboard-grid');
        this.initPackery();
      });
  }

  initPackery(): void {
    // init Packery
    this.packery = new Packery(this.grid, PACKERY_OPTIONS);
    let pckry = this.packery;
    let _this = this;
    // TODO: Use userId
    this.userService.getUserPreferences(0)
      .then(initPositions => {
        // init layout with saved positions
        pckry.initShiftLayout(initPositions, DATA_ITEM_ATTRIBUTE);
        pckry.getItemElements().forEach(function (itemElem: any) {
          let draggie = new Draggabilly(itemElem);
          pckry.bindDraggabillyEvents(draggie);
          if (!_this.editModeActive) {
            draggie.disable();
          }
        });
      });
  }

  onSaveChangesClicked(): void {
    let positions = this.packery.getShiftPositions('data-item-id');
    // TODO: User userId
    this.userService.setUserPreferences(0, positions)
      .then(success => {
        if (success) {
          this.router.navigate(['dashboard/', 'home']);
        } else {
          // TODO
        }
      });
  }
}
