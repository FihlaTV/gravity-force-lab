// Copyright 2018-2019, University of Colorado Boulder

/**
 * Model for one of the spherical draggable masses.
 *
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCObject' );

  // constants
  // scale to brighten the base color to achieve rgba(150, 150, 255) but still be red or blue
  const baseColorModifier = 0.59;

  /**
   * @param {number} initialMass
   * @param {Vector2} initialPosition
   * @param {Range} valueRange
   * @param {number} density
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Color} baseColor
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function Mass( initialMass, initialPosition, valueRange, density, constantRadiusProperty, baseColor, tandem, options ) {

    // @private
    this.density = density;

    ISLCObject.call( this, initialMass, initialPosition, valueRange, constantRadiusProperty, tandem, options );

    // see ISLCObject, mass color is will change with value of constantRadiusProperty (set within sim)
    this.baseColorProperty = new DerivedProperty( [ this.valueProperty, constantRadiusProperty ],
      function( value, constantRadius ) {
        return constantRadius ?
               baseColor.colorUtilsBrighter( 1 - Math.abs( value ) / valueRange.max ) :
               baseColor.colorUtilsBrighter( baseColorModifier );
      } );
  }

  gravityForceLab.register( 'Mass', Mass );

  return inherit( ISLCObject, Mass, {

    /**
     * calculates the radius based on mass of object maintaining constant density
     * calculations are made using the density formula and volume of a sphere
     * @public
     * @override
     * @param {number} mass
     */
    calculateRadius: function( mass ) {
      const sphereVolume = mass / this.density;
      const sphereRadius = Math.pow( ( 3 * sphereVolume ) / ( 4 * Math.PI ), 1 / 3 );
      return sphereRadius;
    }
  } );
} );
