import {Component, OnInit} from '@angular/core';
import $ = require('jquery');
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../shared/service/service';
import {ServiceService} from "../shared/service/service.service";

// Packery  -  http://packery.metafizzy.co/
declare let Packery: any;
// Draggabilly  -  http://draggabilly.desandro.com/
declare let Draggabilly: any;

@Component({
  moduleId: module.id,
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent implements OnInit {
  // https://www.thepolyglotdeveloper.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/
  packery: any;

  // Also got help from https://github.com/metafizzy/packery/issues/337 for persistent positioning

  dataItemAttribute: string = 'data-item-id';

  draggabillyOptions: any = {
    containment: '.grid'
  };

  packeryOptions: any = {
    itemSelector: '.grid-item',
    columnWidth: 150,
    initLayout: false // disable initial layout
  };

  draggies: any[] = [];
  editModeActive: boolean = false;
  $grid: any;

  // TODO: Fetch real tiles
  services: Service[];

  static getSavedDraggedPositions(): string {
    console.log('getSavedDraggedPositions');
    // TODO: Get positions from service
    return localStorage.getItem('dragPositions');
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceService: ServiceService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.editModeActive = (this.route.data as any).value.editModeActive === true;
    this.serviceService.getServices()
      .then(services => this.services = services);
    this.$grid = $('.grid');
    // init Packery
    this.packery = new Packery('.grid', this.packeryOptions);
    let initPositions = MainViewComponent.getSavedDraggedPositions();

    // init layout with saved positions
    this.packery.initShiftLayout(initPositions, this.dataItemAttribute);
    this.initDraggableItems();
    if (!this.editModeActive) {
      this.makeItemsStatic();
    }

    // Initialize event listeners (button clicks, etc.)
    this.initListeners();
  }

  initListeners() {
    console.log('initListeners');
    let _this = this;
    this.$grid.on('dragItemPositioned', function () {
      _this.saveDragPositions();
    });
  }

  onSaveChangesClicked(): void {
    console.log('onSaveChangesClicked');
    // TODO: Save changes to dbviewService
    this.router.navigate(['dashboard/', 'home']);
  }

  initDraggableItems() {
    console.log('initDraggableItems');
    let _this = this;
    this.$grid.find('.grid-item').each(function (i: number, itemElem: any) {
      let draggie = new Draggabilly(itemElem, _this.draggabillyOptions);
      _this.packery.bindDraggabillyEvents(draggie);
      _this.draggies[i] = draggie;
    });
    console.log(_this.draggies);
  }

  makeItemsDraggable() {
    console.log('makeItemsDraggable');
    for (let i = 0; i < this.draggies.length; i++) {
      this.draggies[i].enable();
    }
  }

  makeItemsStatic() {
    console.log('makeItemsStatic');
    for (let i = 0; i < this.draggies.length; i++) {
      this.draggies[i].disable();
    }
  }

  saveDragPositions() {
    console.log('saveDragPositions');
    let positions = this.packery.getShiftPositions('data-item-id');
    localStorage.setItem('dragPositions', JSON.stringify(positions));
  }
}
