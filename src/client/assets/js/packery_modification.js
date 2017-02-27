// add Packery.prototype methods

// get JSON-friendly data for items positions
Packery.prototype.getShiftPositions = function( attrName ) {
  attrName = attrName || 'id';
  var _this = this;
  return this.items.map( function( item ) {
    return {
      attr: item.element.getAttribute( attrName ),
      x: item.rect.x / _this.packer.width
    }
  });
};

Packery.prototype.initShiftLayout = function( positions, attr ) {
  if ( !positions ) {
    // if no initial positions, run packery layout
    this.layout();
    return;
  }
  // parse string to JSON
  if ( typeof positions == 'string' ) {
    try {
      positions = JSON.parse( positions );
    } catch( error ) {
      console.error( 'JSON parse error: ' + error );
      this.layout();
      return;
    }
  }

  attr = attr || 'id'; // default to id attribute
  this._resetLayout();
  // set item order and horizontal position from saved positions
  this.items = positions.map( function( itemPosition ) {
    var selector = '[' + attr + '="' + itemPosition.attr  + '"]'
    var itemElem = this.element.querySelector( selector );
    var item = this.getItem( itemElem );
    item.rect.x = itemPosition.x * this.packer.width;
    return item;
  }, this );
  this.shiftLayout();
};
