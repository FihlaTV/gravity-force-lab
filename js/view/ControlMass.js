// Copyright 2002-2013, University of Colorado Boulder

/**
 * Slider and button for changing a mass.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Strings = require( 'Strings' );
  var Panel = require( 'SUN/Panel' );
  var FillHighlightListener = require( 'SCENERY_PHET/input/FillHighlightListener' );
  var Range = require( 'DOT/Range' );

  // constants
  var MASS_RANGE = new Range( 1, 100 );
  var TRACK_SIZE = new Dimension2( 170, 3 );
  var THUMB_SIZE = new Dimension2( 22, 42 );
  var THUMB_FILL_ENABLED = 'rgb(50,145,184)';
  var THUMB_FILL_HIGHLIGHTED = 'rgb(71,207,255)';
  var THUMB_RADIUS = 0.25 * THUMB_SIZE.width;

  function Track( options ) {
    Rectangle.call( this, 0, 0, TRACK_SIZE.width, TRACK_SIZE.height, { cursor: 'pointer', fill: "black" } );
    var thisNode = this,
      positionToConcentration = new LinearFunction( 0, TRACK_SIZE.width, MASS_RANGE.min, MASS_RANGE.max, true ),
      handleEvent = function( event ) {
        options.property.set( Math.round( positionToConcentration( thisNode.globalToLocalPoint( event.pointer.point ).x ) ) );
      };
    this.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          handleEvent( event );
        },
        drag: function( event ) {
          handleEvent( event );
        },
        translate: function() {
          // do nothing, override default behavior
        }
      } ) );
    // increase the vertical hit area, so the track is easier to hit
    var hitAreaMargin = 8;
    thisNode.mouseArea = thisNode.touchArea = Shape.rectangle( 0, -hitAreaMargin, TRACK_SIZE.width, TRACK_SIZE.height + hitAreaMargin + hitAreaMargin );
  }

  inherit( Rectangle, Track );

  function TickLine() {
    Path.call( this, {
      shape: Shape.lineSegment( 0, 0, 0, ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2 ),
      stroke: 'black',
      lineWidth: 1 } );
  }

  inherit( Path, TickLine );

  function TickLabel( value ) {
    Text.call( this, value, { fontSize: 14, fill: 'black' } );
  }

  inherit( Text, TickLabel );

  function Thumb( options ) {
    Node.call( this, { cursor: 'pointer' } );

    var thisNode = this;
    var massToPosition = new LinearFunction( MASS_RANGE.min, MASS_RANGE.max, 0, TRACK_SIZE.width, true );
    var clickXOffset;

    // draw the thumb
    var body = new Rectangle( -THUMB_SIZE.width / 2, -THUMB_SIZE.height / 2, THUMB_SIZE.width, THUMB_SIZE.height, THUMB_RADIUS, THUMB_RADIUS,
      { cursor: 'pointer', fill: THUMB_FILL_ENABLED, stroke: 'black', lineWidth: 1 } );
    var CENTER_LINE_Y_MARGIN = 3;
    body.addChild( new Path( {
      shape: Shape.lineSegment( 0, -( THUMB_SIZE.height / 2 ) + CENTER_LINE_Y_MARGIN, 0, ( THUMB_SIZE.height / 2 ) - CENTER_LINE_Y_MARGIN ),
      stroke: 'white' } ) );
    body.left = -body.width / 2;
    this.addChild( body );

    // make the thumb highlight
    body.addInputListener( new FillHighlightListener( THUMB_FILL_ENABLED, THUMB_FILL_HIGHLIGHTED ) );

    // touch area
    var dx = 0.25 * this.width;
    var dy = 0.5 * this.height;
    this.touchArea = Shape.rectangle( ( -this.width / 2 ) - dx, ( -this.height / 2 ) - dy, this.width + dx + dx, this.height + dy + dy );
    this.addInputListener( new SimpleDragHandler(
      {
        allowTouchSnag: true,
        start: function( event ) {
          clickXOffset = thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var x = thisNode.globalToParentPoint( event.pointer.point ).x - clickXOffset;
          x = Math.max( Math.min( x, TRACK_SIZE.width ), 0 );
          options.property.set( Math.round( massToPosition.inverse( x ) ) );
        },
        translate: function() {
          // do nothing, override default behavior
        }
      } ) );
    options.property.link( function( concentration ) {
      thisNode.x = massToPosition( concentration );
    } );
  }

  inherit( Node, Thumb );

  function ControlMass( options ) {

    options = _.extend( {
      title: Strings["GFL.mass1"],
      scale: 0.8,
      fill: '#FDF498',
      fontSize: 16,
      xMargin: 15,
      yMargin: 10
    }, options );

    Node.call( this );

    // nodes
    var content = new Node();
    var track = new Track( options );
    var thumb = new Thumb( options );
    var plusButton = new ArrowButton( 'right', function propertyPlus() {
      options.property.set( Math.min( options.property.get() + 1, MASS_RANGE.max ) );
    } );
    var minusButton = new ArrowButton( 'left', function propertyMinus() {
      options.property.set( Math.max( options.property.get() - 1, MASS_RANGE.min ) );
    } );
    var valueLabel = new Text( "", { fontSize: 18, pickable: false } );
    var valueField = new Rectangle( 0, 0, 100, 30, 3, 3, { fill: "#FFF", stroke: 'black', lineWidth: 1, pickable: false } );
    var title = new Text( options.title, { fontSize: 24, pickable: false } );
    var minLabel = new Text( MASS_RANGE.min.toFixed( 0 ), { fontSize: 14, pickable: false } );
    var maxLabel = new Text( MASS_RANGE.max.toFixed( 0 ), { fontSize: 14, pickable: false } );
    var minTickLine = new TickLine();
    var maxTickLine = new TickLine();

    // rendering order
    content.addChild( valueField );
    content.addChild( valueLabel );
    content.addChild( title );
    content.addChild( minTickLine );
    content.addChild( maxTickLine );
    content.addChild( minLabel );
    content.addChild( maxLabel );
    content.addChild( track );
    content.addChild( thumb );
    content.addChild( plusButton );
    content.addChild( minusButton );

    // relative layout, everything relative to the track
    {
      // value centered above the track
      valueField.centerX = track.centerX;
      valueField.bottom = thumb.top - 10;
      valueLabel.centerX = valueField.centerX;
      valueLabel.centerY = valueField.centerY;
      // title centered above the value
      title.centerX = valueField.centerX;
      title.bottom = valueField.top - 6;
      // plus button to the right of the value
      plusButton.left = valueField.right + 10;
      plusButton.centerY = valueField.centerY;
      // minus button to the left of the value
      minusButton.right = valueField.left - 10;
      minusButton.centerY = valueField.centerY;
      // min tick at left end of track
      minTickLine.top = track.top;
      minTickLine.left = track.left;
      minLabel.centerX = minTickLine.centerX;
      minLabel.top = minTickLine.bottom + 3;
      // max tick at right end of track
      maxTickLine.top = track.top;
      maxTickLine.right = track.right;
      maxLabel.centerX = maxTickLine.centerX;
      maxLabel.top = maxTickLine.bottom + 3;
    }

    // wrap in a panel
    this.addChild( new Panel( content, { fill: options.fill, xMargin: options.xMargin, yMargin: options.yMargin, scale: options.scale, resize: false } ) );

    options.property.link( function updateMass( value ) {
      valueLabel.text = options.property.get() + " " + Strings["GFL.unitKg"];
      valueLabel.centerX = valueField.centerX; // keep the value centered in the field
      plusButton.setEnabled( options.property.get() < MASS_RANGE.max );
      minusButton.setEnabled( options.property.get() > MASS_RANGE.min );
    } );
  }

  inherit( Node, ControlMass );

  return ControlMass;
} )
;
