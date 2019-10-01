// Copyright 2013-2019, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the mass amount.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Util = require( 'DOT/Util' );

  // strings
  const unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );

  // constants
  const TRACK_SIZE = new Dimension2( 170, 3 );
  const THUMB_SIZE = new Dimension2( 22, 42 );

  class MassControl extends ISLCObjectControlPanel {

    /**
     * @param {string} titleString
     * @param {Property.<number>} valueProperty
     * @param {Range} massRange
     * @param {Color} thumbColor
     * @param {ISLCObjectEnum} massEnum
     * @param {Property[]} updateDescriptionProperties - Properties to monitor to keep descriptions up to date
     * @param {GravityForceLabAlertManager} alertManager
     * @param {MassDescriber} massDescriber
     * @param {Tandem} tandem
     */
    constructor( titleString, valueProperty, massRange, thumbColor, massEnum, updateDescriptionProperties,
                 alertManager, massDescriber, tandem ) {

      super( titleString, unitsKgString, valueProperty, massRange, {
        // panel options
        fill: '#FDF498',
        xMargin: 15,
        yMargin: 10,

        numberControlOptions: {
          sliderOptions: {
            thumbSize: THUMB_SIZE,
            trackSize: TRACK_SIZE,
            majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
            minorTickSpacing: 0,
            thumbFill: thumbColor.colorUtilsBrighter( 0.15 ),
            thumbFillHighlighted: thumbColor.colorUtilsBrighter( 0.35 ),
            constrainValue: v => Util.roundToInterval( v, 10 ),

            // a11y
            keyboardStep: 50,
            pageKeyboardStep: 100,
            accessibleName: titleString,
            a11yCreateAriaValueText: () => massDescriber.getMassAndUnit( massEnum )
          },
          titleNodeOptions: { font: new PhetFont( 24 ) },
          numberDisplayOptions: {
            font: new PhetFont( 18 ),
            xMargin: 20,
            yMargin: 4
          }

        },

        tickLabelOptions: {
          font: new PhetFont( 14 )
        },

        tandem: tandem
      } );
    }
  }

  return gravityForceLab.register( 'MassControl', MassControl );
} );
