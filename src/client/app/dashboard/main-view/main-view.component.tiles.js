// ------------------ Configuration --------------------------

var dataItemAttribute = 'data-item-id';

var draggabillyOptions = {
  containment: '.grid'
};

var packeryOptions = {
  itemSelector: '.grid-item',
  columnWidth: 100,
  initLayout: false // disable initial layout
};


// ------------------ Packery Main Code ----------------------

var draggies = [];
var editModeActive = false;

// init Packery
var $grid = $('.grid').packery(packeryOptions);

var initPositions = getSavedDraggedPositions();

// init layout with saved positions
$grid.packery('initShiftLayout', initPositions, dataItemAttribute);

// Tiles don't start in edit mode, so we make them static
initDraggableItems();
makeItemsStatic();


// ------------------- Event Listeners ----------------------

$grid.on('dragItemPositioned', function () {
  saveDragPositions();
});

$('#edit-button').click(function (event) {
  if (editModeActive) {
    saveDragPositions();
    makeItemsStatic();
    event.target.textContent = "Edit";
    editModeActive = false;
  } else {
    makeItemsDraggable();
    event.target.textContent = "Save";
    editModeActive = true;
  }
  $grid.find('.grid-item').toggleClass('is-editable');
});


// ------------------- Helper Functions ---------------------

function getSavedDraggedPositions() {
  return localStorage.getItem('dragPositions');
}

function initDraggableItems() {
  $grid.find('.grid-item').each(function (i, itemElem) {
    var draggie = new Draggabilly(itemElem, draggabillyOptions);
    $grid.packery('bindDraggabillyEvents', draggie);
    draggies[i] = draggie;
  });
}

function makeItemsDraggable() {
  for (var i = 0; i < draggies.length; i++) {
    draggies[i].enable();
  }
}

function makeItemsStatic() {
  for (var i = 0; i < draggies.length; i++) {
    draggies[i].disable();
  }
}

function saveDragPositions() {
  var positions = $grid.packery('getShiftPositions', 'data-item-id');
  localStorage.setItem('dragPositions', JSON.stringify(positions));
}
