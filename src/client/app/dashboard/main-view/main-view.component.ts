import {Component, OnInit} from '@angular/core';
import $ = require('jquery');

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

  static getSavedDraggedPositions(): string {
    return localStorage.getItem('dragPositions');
  }

  ngOnInit() {
    this.$grid = $('.grid');
    // init Packery
    this.packery = new Packery('.grid', this.packeryOptions);
    let initPositions = MainViewComponent.getSavedDraggedPositions();

    // init layout with saved positions
    this.packery.initShiftLayout(initPositions, this.dataItemAttribute);

    // Tiles don't start in edit mode, so we make them static
    this.initDraggableItems();
    this.makeItemsStatic();

    // Initialize event listeners (button clicks, etc.)
    this.initListeners();
  }

  initListeners() {
    let _this = this;
    this.$grid.on('dragItemPositioned', function () {
      _this.saveDragPositions();
    });

    $('#edit-button').click(function (event) {
      _this.onEditButtonClicked(_this, event);
    });
  }

  onEditButtonClicked(_this: any, event: any) {
    if (_this.editModeActive) {
      _this.makeItemsStatic();
      event.target.textContent = 'Edit';
      _this.editModeActive = false;
    } else {
      _this.makeItemsDraggable();
      event.target.textContent = 'Done';
      _this.editModeActive = true;
    }
    _this.$grid.find('.grid-item').toggleClass('is-editable');
  }

  initDraggableItems() {
    let _this = this;
    this.$grid.find('.grid-item').each(function (i: number, itemElem: any) {
      let draggie = new Draggabilly(itemElem, _this.draggabillyOptions);
      _this.packery.bindDraggabillyEvents(draggie);
      _this.draggies[i] = draggie;
    });
  }

  makeItemsDraggable() {
    for (let i = 0; i < this.draggies.length; i++) {
      this.draggies[i].enable();
    }
  }

  makeItemsStatic() {
    for (let i = 0; i < this.draggies.length; i++) {
      this.draggies[i].disable();
    }
  }

  saveDragPositions() {
    let positions = this.packery.getShiftPositions('data-item-id');
    localStorage.setItem('dragPositions', JSON.stringify(positions));
  }
}
