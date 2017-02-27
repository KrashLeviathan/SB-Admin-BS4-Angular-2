import {Component} from '@angular/core';

declare var packery: any;
declare var Draggabilly: any;

// Resources:
// Packery  -
// Draggabilly  -  http://draggabilly.desandro.com/

@Component({
  moduleId: module.id,
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})

export class MainViewComponent {
  // https://www.thepolyglotdeveloper.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/
  // packery: any;

  // Also got help from https://github.com/metafizzy/packery/issues/337 for persistent positioning

  dataItemAttribute: 'data-item-id';

  draggabillyOptions: {
    containment: '.grid'
  };

  packeryOptions: {
    itemSelector: '.grid-item',
    columnWidth: 100,
    initLayout: false // disable initial layout
  };

  draggies: any[] = [];
  editModeActive: boolean = false;
  $grid: any;

  constructor() {
    // init Packery
    this.$grid = $('.grid').packery(this.packeryOptions);
    let initPositions = this.getSavedDraggedPositions();

    // init layout with saved positions
    this.$grid.packery('initShiftLayout', initPositions, this.dataItemAttribute);

    // Tiles don't start in edit mode, so we make them static
    this.initDraggableItems();
    this.makeItemsStatic();

    // Initialize event listeners (button clicks, etc.)
    this.initListeners();
  }

  initListeners() {
    this.$grid.on('dragItemPositioned', function () {
      this.saveDragPositions();
    });

    $('#edit-button').click(this.onEditButtonClicked);
  }

  onEditButtonClicked(event) {
    if (this.editModeActive) {
      this.saveDragPositions();
      this.makeItemsStatic();
      event.target.textContent = 'Edit';
      this.editModeActive = false;
    } else {
      this.makeItemsDraggable();
      event.target.textContent = 'Save';
      this.editModeActive = true;
    }
    this.$grid.find('.grid-item').toggleClass('is-editable');
  }

  getSavedDraggedPositions(): string {
    return localStorage.getItem('dragPositions');
  }

  initDraggableItems() {
    this.$grid.find('.grid-item').each(function (i, itemElem) {
      let draggie = new Draggabilly(itemElem, this.draggabillyOptions);
      this.$grid.packery('bindDraggabillyEvents', draggie);
      this.draggies[i] = draggie;
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
    let positions = this.$grid.packery('getShiftPositions', 'data-item-id');
    localStorage.setItem('dragPositions', JSON.stringify(positions));
  }
}
